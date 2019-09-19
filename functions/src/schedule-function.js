const admin = require('firebase-admin');

module.exports = (request, response) => {
  console.log('I am alive!');
  admin.messaging().sendToDevice('dOGGX_Wmv8s:APA91bH3Zyz5T2AoeSnNsGkKbVzphehq2ztqN7TITCe5EeABZMLCRz9bvlHW402S4AYk2OkO-9BDKhjCQXKLLOmWyn0mPoWwkTMiHIFcsrnHeaXvDRklfmnJF5VHU3ObKOzdqUhRrnAg', {
    notification: {
      title: 'qwe',
      body: 'asd',
      icon: 'favicon.ico',
      clickAction: 'http://localhost:4200/auth/sign-in',
      sound: 'notification.mp3'
    }
  });

  response.send({message: 'hello world!'});
};
