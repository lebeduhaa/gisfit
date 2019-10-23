import { Component, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { HistoryService } from '../../services/history.service';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { History } from 'src/app/shared/models/history.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})
export class HistoryComponent extends FirebaseCloudMessaging {

  public history: History;
  public progressBarVisibility: boolean;

  constructor(
    protected messaging: AngularFireMessaging,
    protected dialog: MatDialog,
    protected settingsService: SettingsService,
    private historyService: HistoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private subjectService: SubjectService
  ) {
    super(messaging, settingsService, dialog);
  }

  public reactOnSelectDate(date: Date): void {
    const currentDate = new Date();

    this.progressBarVisibility = true;

    if (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    ) {
      this.historyService.getCurrentDayProgress()
        .then(history => {
          this.history = history;
          this.subjectService.emitSubject(APP.subjects.history, history);
          this.progressBarVisibility = false;
          this.changeDetectorRef.markForCheck();
        });
    } else {
      this.historyService.getUserHistory(date)
        .then(history => {
          if (history) {
            this.subjectService.emitSubject(APP.subjects.history, history);
          }

          this.history = history;
          this.progressBarVisibility = false;
          this.changeDetectorRef.markForCheck();
        });
    }

  }

  private getCurrentDayProgress(): void {

  }

}
