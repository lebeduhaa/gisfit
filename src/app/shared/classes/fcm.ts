import { AngularFireMessaging } from '@angular/fire/messaging';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { APP } from '../constants';
import { DailyReportComponent } from '../components/daily-report/daily-report.component';
import { User } from '../models/user.model';

export class FirebaseCloudMessaging {

  private tokenSubscription: Subscription;
  private messageSubscription: Subscription;

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog
  ) {}

  protected init(user: User): void {
    this.unsubscribe();
    this.tokenSubscription = this.messaging.requestToken
      .subscribe(token => this.updateUserDeviceToken(token));
    this.messageSubscription = this.messaging.messages
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

  private unsubscribe(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  private updateUserDeviceToken(token: string): void {
    const userId = JSON.parse(localStorage.getItem(APP.cachedData.userData)).id;

    Promise.resolve(this.settingsService.updateUserData({deviceToken: token}, userId));
  }

}
