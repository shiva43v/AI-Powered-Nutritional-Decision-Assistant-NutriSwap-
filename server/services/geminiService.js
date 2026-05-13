const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

const identifyFoodFromImage = async (imagePath, mimeType) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" }); 

    const prompt = `You are an expert nutritionist and food recognition AI. 
    Analyze this image and identify all food items present.
    Return ONLY a raw JSON array of objects with no markdown formatting, no backticks, and no extra text.
    Each object must have these exact keys:
    - name: String (name of the food item)
    - calories: Number (estimated total calories)
    - portionSize: String (estimated portion, e.g., "1 cup", "200g", "1 slice")
    - protein: Number (estimated protein in grams)
    - carbs: Number (estimated carbs in grams)
    - fats: Number (estimated fats in grams)
    
    If you cannot identify any food, return an empty array [].`;

    const imageParts = [
      fileToGenerativePart(imagePath, mimeType),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown blocks if the model ignores instructions
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON. Text received:", text);
      console.error("Parse error:", e);
      return [];
    }
  } catch (error) {
    console.error('Error in identifyFoodFromImage:', error.message || error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    throw new Error(`Failed to analyze image: ${error.message || 'Unknown error'}`);
  }
};

const identifyFoodFromText = async (textDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `You are an expert nutritionist. 
    The user has described their meal: "${textDescription}".
    Identify the food items and estimate their nutritional values.
    Return ONLY a raw JSON array of objects with no markdown formatting and no extra text.
    Each object must have these exact keys:
    - name: String (name of the food item)
    - calories: Number (estimated total calories)
    - portionSize: String (estimated portion)
    - protein: Number (estimated protein in grams)
    - carbs: Number (estimated carbs in grams)
    - fats: Number (estimated fats in grams)
    
    If you cannot identify any food, return an empty array [].`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", text);
      return [];
    }
  } catch (error) {
    console.error('Error in identifyFoodFromText:', error.message || error);
    throw new Error(`Failed to analyze text: ${error.message || 'Unknown error'}`);
  }
};

const generateNutriSwap = async (foodItems, userGoal) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `You are a world-class Nutritional Strategist app. The user's current goal is: "${userGoal}".
    They are considering eating the following items:
    ${JSON.stringify(foodItems, null, 2)}
    
    Your job is to provide 2 smart "NutriSwap" alternatives that satisfy the craving but better align with their goal.
    For example, if they want soda and are on Sugar Detox, suggest sparkling water with lime.
    
    Return ONLY a raw JSON array of objects with no markdown formatting and no extra text.
    Each object must have:
    - originalFoodName: String (which item this replaces)
    - name: String (the suggested swap)
    - description: String (short catchy description)
    - calories: Number (estimated calories of swap)
    - protein: Number (grams)
    - carbs: Number (grams)
    - fats: Number (grams)
    - whyItsBetter: String (1-2 sentences explaining why this fits their "${userGoal}" goal better)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", text);
      return [];
    }
  } catch (error) {
    console.error('Error in generateNutriSwap:', error);
    throw new Error('Failed to generate swaps');
  }
};

module.exports = {
  identifyFoodFromImage,
  identifyFoodFromText,
  generateNutriSwap
};
