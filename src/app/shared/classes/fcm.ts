import { AngularFireMessaging } from '@angular/fire/messaging';

import { OnInit } from '@angular/core';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { APP } from '../constants';

export class FirebaseCloudMessaging implements OnInit {

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.messaging.requestToken
      .subscribe(token => this.updateUserDeviceToken(token));

    this.messaging.messages
      .subscribe(message => console.log(message));
  }

  private updateUserDeviceToken(token: string): void {
    const userId = JSON.parse(localStorage.getItem(APP.cachedData.userId));

    this.settingsService.updateUserData({deviceToken: token}, userId)
      .then(() => console.log(token));
  }

}
