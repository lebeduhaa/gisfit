import { Injectable } from '@angular/core';

// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  // public messages(): void {
  //   const messaging = firebase.messaging();
  //   messaging.usePublicVapidKey('BOduJLZXiSldtqB7fEnh81PSPTYyenHDQvEv9GEUHzxtfWYLg5KCliKew9K2WqZmTvDd4mNpK80BuEKGKJnLFbw');
  //   Notification.requestPermission().then(result => {
  //     console.log(result);
  //   });

  //   messaging.getToken()
  //     .then(currentToken => {
  //       if (currentToken) {
  //         console.log('token : ', currentToken);
  //       }
  //     });

  //   messaging.onMessage(payload => {
  //     console.log(payload);
  //   });

  //   Notification.requestPermission().then(result => console.log(result));
  // }

}
