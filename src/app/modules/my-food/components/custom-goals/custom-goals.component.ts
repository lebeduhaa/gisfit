import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { APP } from 'src/app/shared/constants';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { User } from 'src/app/shared/models/user.model';
import { flatEquality } from 'src/app/shared/helpers';

@AutoUnsubscribe()
@Component({
  selector: 'app-custom-goals',
  templateUrl: 'custom-goals.component.html',
  styleUrls: ['custom-goals.component.css']
})
export class CustomGoalsComponent implements OnInit, OnDestroy {

  public error: string;
  public spinnerStateSubject = new Subject<boolean>();
  public tempUser: User;
  public disableAcceptButton: boolean;

  private currentUserSubscription: Subscription;
  private user: User;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService
  ) {}

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
    this.spinnerStateSubject.next(true);
    this.settingsService.updateUserData({
      customCaloriesGoal: Number(this.tempUser.customCaloriesGoal),
      customProteinGoal: Number(this.tempUser.customProteinGoal),
      customFatsGoal: Number(this.tempUser.customFatsGoal),
      customCarbohydratesGoal: Number(this.tempUser.customCarbohydratesGoal)
    }, this.user.id)
      .then(() => {
        this.dialog.getDialogById(APP.dialogs.customGoals).close();
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Custom goals',
          body: 'Great! You have configured your own goals, now you can use it for your daily progress',
          duration: 15000
        });
      })
      .catch(error => {
        this.error = error.message;
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeToCurrentUser(): void {
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.tempUser = {...user};
        this.disableAcceptButton = true;
      });
  }

  ngOnDestroy() {}

}
