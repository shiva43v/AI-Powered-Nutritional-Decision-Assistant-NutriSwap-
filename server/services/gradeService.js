const calculateUtilityGrade = (foodItems, userGoal, tdee) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  foodItems.forEach(item => {
    totalCalories += item.calories;
    totalProtein += item.protein;
    totalCarbs += item.carbs;
    totalFats += item.fats;
  });

  let score = 100;
  let reasonings = [];

  // Very basic scoring logic based on goal
  if (userGoal === 'Sugar Detox') {
    if (totalCarbs > 50) {
      score -= 30;
      reasonings.push("High carbohydrate content might spike insulin.");
    } else if (totalCarbs < 20) {
      score += 10;
      reasonings.push("Great low-carb choice for your detox.");
    }
  } else if (userGoal === 'Lean Bulk') {
    if (totalProtein < 20) {
      score -= 20;
      reasonings.push("A bit low on protein for building muscle.");
    } else {
      score += 15;
      reasonings.push("Solid protein hit for your bulk.");
    }
  } else if (userGoal === 'Fat Cut') {
    if (totalCalories > (tdee * 0.3)) { // if one meal is > 30% of daily TDEE
      score -= 25;
      reasonings.push("High calorie density for a cutting phase.");
    }
    if (totalProtein > 25) {
      score += 10;
      reasonings.push("High protein will keep you satiated.");
    }
  } else {
    // Maintenance
    if (totalCalories > 1000) {
      score -= 20;
      reasonings.push("Very heavy meal.");
    }
  }

  // Cap score
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let grade = 'C';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';

  return {
    grade,
    reasoning: reasonings.join(" ") || "Decent choice for your current goals.",
    totalCalories,
    totalMacros: {
      protein: totalProtein,
      carbs: totalCarbs,
      fats: totalFats
    }
  };
};

module.exports = {
  calculateUtilityGrade
};
