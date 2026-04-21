const mongoose = require('mongoose');

const swapSuggestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  originalFood: {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    macros: {
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number }
    }
  },
  suggestedSwap: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true },
    macros: {
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number }
    },
    whyItsBetter: { type: String, required: true }
  },
  goalContext: {
    type: String,
    required: true // e.g., 'Sugar Detox'
  },
  accepted: {
    type: Boolean,
    default: null // null = no response, true = accepted, false = rejected
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SwapSuggestion', swapSuggestionSchema);
