require('dotenv').config({ path: './.env' });
const { identifyFoodFromImage } = require('../services/geminiService');
const path = require('path');
const fs = require('fs');

async function test() {
  console.log("Testing Gemini API...");
  console.log("API Key present:", !!process.env.GEMINI_API_KEY);
  
  // We need a small image to test. I'll check if there are any images in the server or upload a dummy one.
  // For now, let's just see if the service can be initialized.
  try {
     // This will likely fail because we don't have a real image path, 
     // but it will tell us if the library is loaded and the key is at least attempted.
     // Better yet, let's just check the API key format or try a simple text prompt first.
     const { GoogleGenerativeAI } = require('@google/generative-ai');
     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
     
     // List all models to see what is available
     const listModels = async () => {
       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
       const data = await response.json();
       console.log("Available models:", data.models.map(m => m.name));
     };
     
     await listModels();
  } catch (error) {
    console.error("Gemini Test Error:", error);
  }
}

test();
