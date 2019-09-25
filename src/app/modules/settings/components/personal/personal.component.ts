import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription, Subject } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { APP } from 'src/app/shared/constants';
import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';
import { SettingsService } from '../../services/settings.service';
import { flatEquality, collectChanges } from 'src/app/shared/helpers';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';

@Component({
  selector: 'app-personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public user: User;
  public tempUser: User;
  public preloadedImg: string | ArrayBuffer;
  public clearFilesSubject = new Subject<boolean>();
  public progressBarVisibility: boolean;
  public goals = APP.goals;
  public activities = APP.activities;

  private dialogSubscription: Subscription;
  private userDataSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService,
    private realTimeDataService: RealTimeDataService
  ) {}

  ngOnInit() {
    this.subscribeToUser();
  }

  public reactOnSelectActivity(activity: string): void {
    this.tempUser.activity = activity;
  }

  public reactOnSelectGoal(goal: string): void {
    this.tempUser.goal = goal;
  }

  private subscribeToUser(): void {
    this.progressBarVisibility = true;
    this.userDataSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.tempUser = {...this.user};
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  public selectNewAvatar(event): void {
    if (event.target.files.length) {
      this.openCropperDialog();
    }
  }

  private openCropperDialog(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '700px',
      id: APP.dialogs.cropper,
      data: {
        event,
        round: true
      }
    });

    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe(async base64 => {
          this.clearFilesSubject.next(true);
          this.preloadedImg = base64;
          this.progressBarVisibility = true;
          this.changeDetectorRef.markForCheck();

          await this.settingsService.uploadAvatar(base64, this.user);
          this.progressBarVisibility = false;
          this.changeDetectorRef.markForCheck();
      });
  }

  public disableButton(): boolean {
    return flatEquality(this.tempUser, this.user);
  }

  public async save(): Promise<any> {
    this.progressBarVisibility = true;
    await this.settingsService.updateUser(collectChanges(this.tempUser, this.user), this.user.id);
  }

  ngOnDestroy() {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
      this.userDataSubscription.unsubscribe();
    }
  }

}
