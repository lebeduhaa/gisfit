const admin = require('firebase-admin');
const moment = require('moment');


const getResultString = (attributeName, goal, result) => {
  const percent = Number(((result / goal) * 100).toFixed(3));

  if (percent < 1) {
    return `It seems like you didn't eat ${attributeName} at all. It's too bad. Your result : ${result}/${goal}\n`;
  } else
  if (percent < 50) {
    return `It seems like you didn't scored even half the required level of ${attributeName}. Try to increase it tomorrow! Your result: ${result}/${goal}\n`;
  } else
  if (percent < 80) {
    return `You didn’t reach the ${attributeName} goal, but at least scored more than half. Need to work. Your result: ${result}/${goal}\n`;
  } else
  if (percent < 90) {
    return `Nice result. You almost reach the ${attributeName} goal. Your result: ${result}/${goal}\n`;
  } else
  if (percent < 100) {
    return `Perfect! You too close to the goal. If you continue as well, you will look great =) Your result: ${result}/${goal}\n`;
  } else
  if (percent < 110) {
    return `Almost good! You a bit overdid with ${attributeName}. Try to reduce it tomorrow. Your result: ${result}/${goal}\n`;
  } else {
    return `Bad result. You overeat ${attributeName}, it will make you fat. Your result: ${result}/${goal}\n`;
  }
}

const getResult = user => {
  let resultString = '';

  resultString += getResultString('Calories', user.caloriesGoal, user.currentDay.currentCalories);
  resultString += getResultString('Calories', user.proteinGoal, user.currentDay.currentProtein);
  resultString += getResultString('Calories', user.fatsGoal, user.currentDay.currentFats);
  resultString += getResultString('Carbohydrates', user.carbohydratesGoal, user.currentDay.currentCarbohydrates);

  return resultString;
};

module.exports = async (request, response) => {
  const currentHours = moment(new Date()).hours();
  const users = (await admin.firestore().collection('users').get()).docs.map(doc => doc.data());
  const promises = [];

  users.forEach(user => {
    if (user.notificationTime && user.notificationTime.value === currentHours) {
      console.log('send to ' + user.nickname);
      promises.push(admin.messaging().sendToDevice(user.deviceToken, {
        notification: {
          title: 'Daily report about your progress',
          body: getResult(user),
          icon: 'favicon.ico',
          clickAction: 'https://gisfit-production.web.app/my-food',
          sound: 'notification.mp3'
        }
      }));
    }
  });

  await Promise.all(promises).catch(console.log);
  response.send({message: 'success'});
};
