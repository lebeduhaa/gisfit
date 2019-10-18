import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { HistoryService } from '../../services/history.service';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})
export class HistoryComponent extends FirebaseCloudMessaging {

  constructor(
    protected messaging: AngularFireMessaging,
    protected dialog: MatDialog,
    protected settingsService: SettingsService,
    private historyService: HistoryService
  ) {
    super(messaging, settingsService, dialog);
  }

  public reactOnSelectDate(date: Date): void {
    this.historyService.getUserHistory(date)
      .then(result => console.log(result));
  }

}
