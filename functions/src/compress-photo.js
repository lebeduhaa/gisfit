const { tmpdir } =  require('os');
const { dirname } = require('path');
const sharp = require('sharp');
const fs = require('fs-extra');
const admin = require('firebase-admin');

module.exports = async object => {
  const bucket = admin.storage().bucket();
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  const bucketDir = dirname(filePath);
  const workingDir = `${tmpdir()}/thumbs`;
  const tmpFilePath = `${workingDir}/source.png`;
  const imgName = object.name.split('/')[1];

  if (fileName.includes('thumb@')) {
    const email = imgName.substring(imgName.indexOf('_') + 1, imgName.indexOf('.jpg'));
    const user =  (await admin.firestore().collection('users').where('email', '==', email).get()).docs[0];
    const url = (await bucket.file(filePath).getSignedUrl({action: 'read', expires: '03-09-2491'}))[0];

    return user.ref.update({fakeAvatarUrl: url, fakeAvatarName: filePath});
  }

  const email = imgName.substring(0, imgName.indexOf('.jpg'));
  const user =  (await admin.firestore().collection('users').where('email', '==', email).get()).docs[0];
  const thumbName = `${(new Date()).valueOf()}thumb@${16}_${fileName}`;
  const thumbPath = `${workingDir}/${thumbName}`;

  await fs.ensureDir(workingDir);
  await bucket.file(filePath).download({
    destination: tmpFilePath
  });
  await sharp(tmpFilePath)
    .resize(16, 16)
    .toFile(thumbPath);
  await bucket.upload(thumbPath, {
    destination: `${bucketDir}/${thumbName}`,
    predefinedAcl: 'publicRead'
  });
  await fs.remove(workingDir);

  const url = (await bucket.file(filePath).getSignedUrl({action: 'read', expires: '03-09-2491'}))[0];

  return user.ref.update({avatar: url});
}
