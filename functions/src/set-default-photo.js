const admin = require('firebase-admin');

module.exports = async (change, context) => {
  const projectBucket = admin.storage().bucket('gisfit-production.appspot.com');
  const url = (await projectBucket.file('avatars/default.jpg').getSignedUrl({action: 'read', expires: '03-09-2491'}))[0];
  const fakeUrl = (await projectBucket.file('avatars/default_16.jpg').getSignedUrl({action: 'read', expires: '03-09-2491'}))[0];

  await change.ref.update({
    avatar: url,
    fakeAvatarUrl: fakeUrl,
    fakeAvatarName: 'avatars/default_16.jpg'
  });
};
