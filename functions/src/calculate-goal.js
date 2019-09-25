const activities = {
  'no physical activity': 1.2,
  '3 trainings per week': 1.375,
  '5 trainings per week': 1.4625,
  '5 intense trainings per week': 1.550,
  'training every day': 1.6375,
  'intense trainings every day or more than one time per day': 1.725,
  'daily physical activity plus physical work': 1.9
};
const goals = {
  'lose weight': 0.85,
  'maintain weight': 1,
  'gain weight': 1.15
}

module.exports = async (change, context) => {
  if (
    change.before.data().age === change.after.data().age &&
    change.before.data().height === change.after.data().height &&
    change.before.data().weight === change.after.data().weight &&
    change.before.data().goal === change.after.data().goal &&
    change.before.data().activity === change.after.data().activity
  ) {
    return new Promise((resolve, reject) => resolve());
  }

  if (!change.after.data().ownGoal) {
    const { age, height, weight, goal, activity } = change.after.data();
    const baseCalories = 10 * weight + 6.25 * height - 5 * age + 5;
    const caloriesGoal = Math.ceil((baseCalories * activities[activity]) * goals[goal]);
    const proteinGoal = Math.ceil((caloriesGoal / 6) / 4);
    const fatsGoal = Math.ceil((caloriesGoal / 6) / 9);
    const carbohydratesGoal = Math.ceil(caloriesGoal / 6);

    return change.after.ref.update({caloriesGoal, proteinGoal, fatsGoal, carbohydratesGoal});
  }
}
