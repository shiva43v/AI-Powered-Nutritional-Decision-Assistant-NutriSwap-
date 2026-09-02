const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env'), quiet: true });
const { identifyFoodFromText, generateNutriSwap } = require('../services/openRouterService');

async function test() {
  console.log("Testing OpenRouter API...");
  console.log("API key present:", !!process.env.OPENROUTER_API_KEY);
  console.log("Model:", process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free");

  try {
    const foodItems = await identifyFoodFromText(
      "one bowl of oatmeal with banana slices and a spoon of peanut butter"
    );

    console.log("Identified food:");
    console.log(JSON.stringify(foodItems, null, 2));

    const swaps = await generateNutriSwap(foodItems, "Sugar Detox");

    console.log("NutriSwap suggestions:");
    console.log(JSON.stringify(swaps, null, 2));
  } catch (error) {
    console.error("OpenRouter test error:", error);
    process.exitCode = 1;
  }
}

test();
