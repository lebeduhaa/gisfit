// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDkFGxHY1X5oXL6labXYi94tDB2_WfEMxI',
    authDomain: 'gisfit-production.firebaseapp.com',
    databaseURL: 'https://gisfit-production.firebaseio.com',
    projectId: 'gisfit-production',
    storageBucket: 'gisfit-production.appspot.com',
    messagingSenderId: '256573430882',
    appId: '1:256573430882:web:448662e1b8da748543853b'
  },
  unknownUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/gisfit-production.appspot.com/o/avatars%2Funknown-user.jpg?alt=media&token=00d7e615-451b-477a-bb54-176292e923da'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
