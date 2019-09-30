import { Injectable } from '@angular/core';

import { AngularFireMessaging  } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RootService {


  constructor(
    private messaging: AngularFireMessaging
  ) {}

  public async messages(): Promise<any> {
    this.messaging.requestPermission
      .pipe(mergeMapTo(this.messaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); }
      );

    // messaging.onMessage(payload => {
    //   console.log(payload);
    // });

  }

}
