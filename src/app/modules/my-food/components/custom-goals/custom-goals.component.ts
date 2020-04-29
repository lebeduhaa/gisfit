import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { APP } from 'src/app/shared/constants';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { flatEquality } from 'src/app/shared/helpers';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-custom-goals',
  templateUrl: 'custom-goals.component.html',
  styleUrls: ['custom-goals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomGoalsComponent extends Unsubscribe implements OnInit {

  public error: string;
  public spinnerStateSubject = new Subject<boolean>();
  public tempUser: User;
  public disableAcceptButton: boolean;

  private user: User;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public reactOnInput(event, key: string): void {
    if (event.target.value) {
      this.tempUser[key] = Number(event.target.value);
    }

    this.disableAcceptButton = flatEquality(this.tempUser, this.user);
  }

  public acceptCustomGoals(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.spinnerStateSubject.next(true);
    this.settingsService.updateUserData({
      customCaloriesGoal: Number(this.tempUser.customCaloriesGoal),
      customProteinGoal: Number(this.tempUser.customProteinGoal),
      customFatsGoal: Number(this.tempUser.customFatsGoal),
      customCarbohydratesGoal: Number(this.tempUser.customCarbohydratesGoal)
    }, this.user.id)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.close();
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Custom goals',
          body: 'Great! You have configured your own goals, now you can use it for your daily progress',
          duration: 15000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.error = error.message;
        this.changeDetectorRef.markForCheck();
      });
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.customGoals).close();
  }

  private subscribeToCurrentUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.tempUser = {...user};
        this.disableAcceptButton = true;
        this.changeDetectorRef.markForCheck();
      });
  }

}
