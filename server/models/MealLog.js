const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  foodItems: [{
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true }, // in grams
    carbs: { type: Number, required: true }, // in grams
    fats: { type: Number, required: true }, // in grams
    portionSize: { type: String }
  }],
  totalCalories: {
    type: Number,
    required: true
  },
  totalMacros: {
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
  },
  imageUrl: {
    type: String
  },
  utilityGrade: {
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F'],
      required: true
    },
    reasoning: {
      type: String
    }
  },
  swapsSuggested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapSuggestion'
  }],
  swapsAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MealLog', mealLogSchema);
