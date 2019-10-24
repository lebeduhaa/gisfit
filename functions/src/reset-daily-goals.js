const admin = require('firebase-admin');
const moment = require('moment');

const getTotalScore = (user) => {
  let caloriesPercent = (user.currentDay.currentCalories / user.caloriesGoal) * 100;
  let proteinPercent = (user.currentDay.currentProtein / user.proteinGoal) * 100;
  let fatsPercent = (user.currentDay.currentFats / user.fatsGoal) * 100;
  let carbohydratesPercent = (user.currentDay.currentCarbohydrates / user.carbohydratesGoal) * 100;

  if (caloriesPercent > 100) {
    caloriesPercent = 200 - caloriesPercent;
  }
  if (proteinPercent > 100) {
    proteinPercent = 200 - proteinPercent;
  }
  if (fatsPercent > 100) {
    fatsPercent = 200 - fatsPercent;
  }
  if (carbohydratesPercent > 100) {
    carbohydratesPercent = 200 - carbohydratesPercent;
  }

  return Math.ceil((caloriesPercent + proteinPercent + fatsPercent + carbohydratesPercent) / 4);
}

module.exports = async (request, response) => {
  const date = new Date();
  const storeKey = date.valueOf();
  const usersRef = await admin.firestore().collection('users').get();
  const totalArrayPromises = usersRef.docs.map(doc => doc.ref.update({currentDay: {
    currentCalories: 0,
    currentProtein: 0,
    currentFats: 0,
    currentCarbohydrates: 0,
    products: []
  }}));
  const resultObject = {
    stringRepresentation: moment(date).format('DD MMMM YYYY'),
    year: moment(date).year(),
    month: moment(date).month(),
    day: moment(date).date()
  }
  const users = [...usersRef.docs.map(doc => doc.data())];

  users.forEach(user => {
    resultObject[user.id] = {
      caloriesGoal: user.ownGoal ? user.customCaloriesGoal : user.caloriesGoal,
      proteinGoal: user.ownGoal ? user.customProteinGoal : user.proteinGoal,
      fatsGoal: user.ownGoal ? user.customFatsGoal : user.fatsGoal,
      carbohydratesGoal: user.ownGoal ? user.customCarbohydratesGoal : user.carbohydratesGoal,
      resultCalories: user.ownGoal ? user.customCaloriesGoal : user.currentDay.currentCalories,
      resultProtein: user.currentDay.currentProtein,
      resultFats: user.currentDay.currentFats,
      resultCarbohydrates: user.currentDay.currentCarbohydrates,
      products: user.currentDay.products,
      totalScore: getTotalScore(user)
    }
  });

  totalArrayPromises.push(admin.firestore().collection('history').doc(storeKey.toString()).set(resultObject));
  await Promise.all(totalArrayPromises);
  response.send({message: 'success'});
}
