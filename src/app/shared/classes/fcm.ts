import { AngularFireMessaging } from '@angular/fire/messaging';

import { MatDialog } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { APP } from '../constants';
import { DailyReportComponent } from '../components/daily-report/daily-report.component';
import { User } from '../models/user.model';
import { Unsubscribe } from './unsubscribe.class';

export class FirebaseCloudMessaging extends Unsubscribe implements OnDestroy {

  private internalSubscriptions: Subscription[] = [];

  set internalSubscribeTo(subscription: Subscription) {
    this.internalSubscriptions.push(subscription);
  }

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog
  ) {
    super();
  }

  protected init(user: User): void {
    if ((window as any).FirebasePlugin) {
      (window as any).FirebasePlugin.getToken(token => {
        this.addUserDevice(user, token);
      });
    }
    else {
      this.internalUnsubscribe();
      this.internalSubscribeTo = this.messaging.requestToken
        .subscribe(token => this.addUserDevice(user, token));
      this.internalSubscribeTo = this.messaging.messages
        .subscribe(message => {
          const sound = new Audio('./assets/audio/notification.mp3');
          const { body, title } = (message as any).notification;
  
          this.dialog.open(DailyReportComponent, {
            data: {
              body,
              title
            },
            id: APP.dialogs.dailyReport,
            width: '650px'
          });
  
          if (user.notificationSound) {
            sound.play();
          }
        });
    }
  }

  private internalUnsubscribe(): void {
    this.internalSubscriptions.forEach(internalSubscription => internalSubscription.unsubscribe());
  }

  private addUserDevice(user: User, token: string): void {
    if (user.deviceTokens.every(userDevice => userDevice !== token)) {
      this.settingsService.addDeviceToken(token);
    }
  }

  ngOnDestroy() {
    this.internalUnsubscribe();
    super.ngOnDestroy();
  }

}
