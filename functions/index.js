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
const resetDailyGoals = require('./src/reset-daily-goals');
const evrooptProxy = require('./src/evrooptProxy');

exports.sendNotification = functions.https.onRequest(sendNotification);
exports.compressPhoto = functions.storage.object().onFinalize(compressPhoto);
exports.setDefaultPhoto = functions.firestore.document('users/{uid}').onCreate(setDefaultPhoto);
exports.calculateGoal = functions.firestore.document('users/{uid}').onUpdate(calculateGoal);
exports.resetDailyGoals = functions.https.onRequest(resetDailyGoals);
exports.evrooptProxy = functions.https.onRequest(evrooptProxy);
