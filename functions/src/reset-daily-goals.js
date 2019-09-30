const admin = require('firebase-admin');
const moment = require('moment');

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
    stringRepresentation: moment(date).format('DD MMMM YYYY')
  }
  const users = [...usersRef.docs.map(doc => doc.data())];

  users.forEach(user => {
    resultObject[user.id] = {
      caloriesGoal: user.caloriesGoal,
      proteinGoal: user.proteinGoal,
      fatsGoal: user.fatsGoal,
      carbohydratesGoal: user.carbohydratesGoal,
      resultCalories: user.currentDay.currentCalories,
      resultProtein: user.currentDay.currentProtein,
      resultFats: user.currentDay.currentFats,
      resultCarbohydrates: user.currentDay.currentCarbohydrates,
      products: user.currentDay.products
    }
  });

  totalArrayPromises.push(admin.firestore().collection('history').doc(storeKey.toString()).set(resultObject));
  await Promise.all(totalArrayPromises);
  response.send({message: 'success'});
}
