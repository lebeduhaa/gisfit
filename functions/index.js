const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { tmpdir } =  require('os');
const { dirname } = require('path');
const sharp = require('sharp');
const fs = require('fs-extra');
const serviceAccount = require('./service-account.json');
const compressPhoto = require('./src/compress-photo');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gisfit-production.appspot.com'
});

exports.scheduleFunction = functions.https.onRequest((request, response) => {
  console.log('I am alive!');
  response.send({message: 'hello world!'});
});

exports.sendNotification = functions.firestore.document('users/{uid}')
  .onCreate((change, context) => {
    admin.messaging().sendToDevice('dOGGX_Wmv8s:APA91bH3Zyz5T2AoeSnNsGkKbVzphehq2ztqN7TITCe5EeABZMLCRz9bvlHW402S4AYk2OkO-9BDKhjCQXKLLOmWyn0mPoWwkTMiHIFcsrnHeaXvDRklfmnJF5VHU3ObKOzdqUhRrnAg', {
      notification: {
        title: 'qwe',
        body: 'asd',
        icon: 'favicon.ico',
        clickAction: 'http://localhost:4200/auth/sign-in',
        sound: 'notification.mp3'
      }
    });
  });

exports.compressPhoto = functions.storage.object().onFinalize(compressPhoto);
