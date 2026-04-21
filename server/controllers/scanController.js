const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');
const { identifyFoodFromImage, generateNutriSwap } = require('../services/geminiService');
const { calculateUtilityGrade } = require('../services/gradeService');
const User = require('../models/User');
const MealLog = require('../models/MealLog');
const SwapSuggestion = require('../models/SwapSuggestion');

// @desc    Process a food image (Identify -> Grade -> Swap)
// @route   POST /api/scan/process
// @access  Private
const processScan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;
    
    const user = await User.findById(req.user._id);
    const userGoal = user.profile.goal || 'Maintenance';
    const tdee = user.profile.tdee || 2000;

    // 1. Identify Food via Gemini Vision
    const foodItems = await identifyFoodFromImage(imagePath, mimeType);
    
    if (!foodItems || foodItems.length === 0) {
      // Clean up local file
      fs.unlinkSync(imagePath);
      return res.status(400).json({ message: 'Could not identify any food items in the image.' });
    }

    // 2. Calculate Utility Grade
    const gradeData = calculateUtilityGrade(foodItems, userGoal, tdee);

    // 3. Generate NutriSwaps
    const swaps = await generateNutriSwap(foodItems, userGoal);

    // 4. Upload image to Cloudinary
    let imageUrl = '';
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'nutriswap'
      });
      imageUrl = result.secure_url;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
    }

    // Clean up local file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // 5. Save SwapSuggestions to DB
    const savedSwaps = [];
    for (let swap of swaps) {
      const originalFood = foodItems.find(f => f.name.toLowerCase().includes(swap.originalFoodName?.toLowerCase()) || f.name === swap.originalFoodName) || foodItems[0];
      
      const newSwap = await SwapSuggestion.create({
        user: req.user._id,
        originalFood: {
          name: originalFood.name,
          calories: originalFood.calories,
          macros: {
            protein: originalFood.protein,
            carbs: originalFood.carbs,
            fats: originalFood.fats
          }
        },
        suggestedSwap: {
          name: swap.name,
          description: swap.description,
          calories: swap.calories,
          macros: {
            protein: swap.protein,
            carbs: swap.carbs,
            fats: swap.fats
          },
          whyItsBetter: swap.whyItsBetter
        },
        goalContext: userGoal
      });
      savedSwaps.push(newSwap);
    }

    // Return the complete analysis to frontend
    // Frontend will display it, and then call POST /api/meals to actually log it if accepted
    res.status(200).json({
      identifiedFood: foodItems,
      grade: gradeData,
      swaps: savedSwaps,
      imageUrl
    });

  } catch (error) {
    console.error(error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  processScan
};
