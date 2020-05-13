const admin = require('firebase-admin');
const moment = require('moment');
const Mailer = require('./lib/mailer');

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
    return `Perfect! You too close to the ${attributeName} goal. If you continue as well, you will look great =) Your result: ${result}/${goal}\n`;
  } else
  if (percent < 110) {
    return `Almost good! You a bit overdid with ${attributeName}. Try to reduce it tomorrow. Your result: ${result}/${goal}\n`;
  } else {
    return `Bad result. You overeat ${attributeName}, it will make you fat. Your result: ${result}/${goal}\n`;
  }
}

const getResult = user => {
  let resultString = '';

  resultString += getResultString('Calories', user.ownGoal ? user.customCaloriesGoal : user.caloriesGoal, user.currentDay.currentCalories);
  resultString += getResultString('Protein', user.ownGoal ? user.customProteinGoal : user.proteinGoal, user.currentDay.currentProtein);
  resultString += getResultString('Fats', user.ownGoal ? user.customFatsGoal : user.fatsGoal, user.currentDay.currentFats);
  resultString += getResultString('Carbohydrates', user.ownGoal ? user.customCarbohydratesGoal : user.carbohydratesGoal, user.currentDay.currentCarbohydrates);

  return resultString;
};

const getTotalScore = (user) => {
  let caloriesPercent = (user.currentDay.currentCalories / (user.ownGoal ? user.customCaloriesGoal : user.caloriesGoal)) * 100;
  let proteinPercent = (user.currentDay.currentProtein / (user.ownGoal ? user.customProteinGoal : user.proteinGoal)) * 100;
  let fatsPercent = (user.currentDay.currentFats / (user.ownGoal ? user.customFatsGoal : user.fatsGoal)) * 100;
  let carbohydratesPercent = (user.currentDay.currentCarbohydrates / (user.ownGoal ? user.customCarbohydratesGoal : user.carbohydratesGoal)) * 100;

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
  const currentHours = moment(new Date()).hours();
  const users = (await admin.firestore().collection('users').get()).docs.map(doc => doc.data());
  const promises = [];
  const mailer = new Mailer('gisfitproduction@gmail.com', '4815162342lL');

  users.forEach(user => {
    if (user.notificationTime && user.notificationTime.utc === currentHours) {
      const resultString = `Your total score today = ${getTotalScore(user)}\n${getResult(user)}`;
      console.log('send to ' + user.nickname);
      user.deviceTokens.forEach(deviceToken => {
        promises.push(admin.messaging().sendToDevice(deviceToken, {
          notification: {
            title: 'Daily report about your progress',
            body: resultString,
            icon: 'favicon.ico',
            clickAction: 'https://gisfit-production.web.app/my-food',
            sound: 'notification.mp3'
          }
        }));
      });

      if (user.sendDailyReportOnEmail) {
        let html = '<ul>';
        let results = resultString.split('\n');

        for (let i = 0; i < results.length - 1; i++) {
          html += `<li>${results[i]}</li>`;
        }

        html += '</ul>'
        console.log(user);
        promises.push(mailer.sendMail('Daily report about your progress', html, user.email));
      }
    }
  });

  await Promise.all(promises).catch(console.log);
  response.send({message: 'success'});
};
