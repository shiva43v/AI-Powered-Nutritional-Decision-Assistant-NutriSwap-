const fs = require("fs");

const OPENROUTER_API_URL =
  process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
const MAX_RETRIES = Math.max(
  1,
  Number.parseInt(process.env.OPENROUTER_MAX_RETRIES || "3", 10) || 3
);

function getApiKey() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  return process.env.OPENROUTER_API_KEY;
}

function imageToDataUrl(imagePath, mimeType) {
  const base64Image = fs.readFileSync(imagePath, "base64");
  return `data:${mimeType};base64,${base64Image}`;
}

function extractMessageText(content) {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        return part?.text || part?.content || "";
      })
      .join("");
  }

  return "";
}

async function callOpenRouter(messages) {
  const headers = {
    Authorization: `Bearer ${getApiKey()}`,
    "Content-Type": "application/json",
  };

  if (process.env.OPENROUTER_SITE_URL) {
    headers["HTTP-Referer"] = process.env.OPENROUTER_SITE_URL;
  }

  if (process.env.OPENROUTER_APP_NAME) {
    headers["X-Title"] = process.env.OPENROUTER_APP_NAME;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.2,
      }),
    });

    const rawBody = await response.text();
    let body;

    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch (error) {
      body = { error: { message: rawBody } };
    }

    if (!response.ok) {
      const message =
        body?.error?.metadata?.raw ||
        body?.error?.message ||
        body?.message ||
        response.statusText;

      if (response.status === 429 && attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(`OpenRouter request failed (${response.status}): ${message}`);
    }

    const content = body?.choices?.[0]?.message?.content;
    const text = extractMessageText(content).trim();

    if (!text) {
      throw new Error("OpenRouter returned an empty response");
    }

    return text;
  }

  throw new Error("OpenRouter request failed after retries");
}

function parseJSON(text) {
  if (!text) return [];

  let normalized = String(text)
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const arrayStart = normalized.indexOf("[");
  const arrayEnd = normalized.lastIndexOf("]");

  if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
    normalized = normalized.slice(arrayStart, arrayEnd + 1);
  }

  try {
    const parsed = JSON.parse(normalized);

    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.items)) return parsed.items;
    if (Array.isArray(parsed.foodItems)) return parsed.foodItems;
    if (Array.isArray(parsed.swaps)) return parsed.swaps;

    return [];
  } catch (error) {
    console.error("Failed to parse model response as JSON:");
    console.error(text);
    console.error(error.message);
    return [];
  }
}

const identifyFoodFromImage = async (imagePath, mimeType) => {
  try {
    const prompt = `You are an expert nutritionist and food recognition AI.

Analyze this image and identify all food items present.

Return ONLY a raw JSON array of objects with no markdown formatting, no backticks, and no extra text.

Each object must have these exact keys:
- name: String
- calories: Number
- portionSize: String
- protein: Number
- carbs: Number
- fats: Number

Estimate the nutritional values based on the visible portion size.

If you cannot identify any food, return an empty array [].`;

    const dataUrl = imageToDataUrl(imagePath, mimeType);
    const text = await callOpenRouter([
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ]);

    return parseJSON(text);
  } catch (error) {
    console.error("Error in identifyFoodFromImage:", error.message || error);
    throw new Error(`Failed to analyze image: ${error.message || "Unknown error"}`);
  }
};

const identifyFoodFromText = async (textDescription) => {
  try {
    const prompt = `You are an expert nutritionist.

The user has described their meal:
"${textDescription}"

Identify the food items and estimate their nutritional values.

Return ONLY a raw JSON array of objects with no markdown formatting and no extra text.

Each object must have these exact keys:
- name: String
- calories: Number
- portionSize: String
- protein: Number
- carbs: Number
- fats: Number

If you cannot identify any food, return an empty array [].`;

    const text = await callOpenRouter([{ role: "user", content: prompt }]);
    return parseJSON(text);
  } catch (error) {
    console.error("Error in identifyFoodFromText:", error.message || error);
    throw new Error(`Failed to analyze text: ${error.message || "Unknown error"}`);
  }
};

const generateNutriSwap = async (foodItems, userGoal) => {
  try {
    const prompt = `You are a world-class Nutritional Strategist.

The user's current goal is:
"${userGoal}"

They are considering eating the following items:
${JSON.stringify(foodItems, null, 2)}

Your job is to provide exactly 2 smart "NutriSwap" alternatives that satisfy the craving but better align with their goal.

For example:
If they want soda and are on a Sugar Detox, suggest sparkling water with lime.

Return ONLY a raw JSON array of objects with no markdown formatting and no extra text.

Each object must have:
- originalFoodName: String
- name: String
- description: String
- calories: Number
- protein: Number
- carbs: Number
- fats: Number
- whyItsBetter: String

whyItsBetter should be 1-2 sentences explaining why this fits their "${userGoal}" goal better.`;

    const text = await callOpenRouter([{ role: "user", content: prompt }]);
    return parseJSON(text);
  } catch (error) {
    console.error("Error in generateNutriSwap:", error.message || error);
    throw new Error(`Failed to generate swaps: ${error.message || "Unknown error"}`);
  }
};

module.exports = {
  identifyFoodFromImage,
  identifyFoodFromText,
  generateNutriSwap,
};
