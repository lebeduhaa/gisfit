const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gisfit-production.appspot.com'
});

const compressPhoto = require('./src/compress-photo');
const sendNotification = require('./src/schedule-function');
const setDefaultPhoto = require('./src/set-default-photo');
const calculateGoal = require('./src/calculate-goal');
const moment = require('moment');

exports.sendNotification = functions.https.onRequest(sendNotification);
exports.compressPhoto = functions.storage.object().onFinalize(compressPhoto);
exports.setDefaultPhoto = functions.firestore.document('users/{uid}').onCreate(setDefaultPhoto);
exports.calculateGoal = functions.firestore.document('users/{uid}').onUpdate(calculateGoal);
exports.resetDailyGoals = functions.https.onRequest(async (request, response) => {
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
});
