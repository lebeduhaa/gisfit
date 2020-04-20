import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { APP } from 'src/app/shared/constants';
import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';
import { SettingsService } from '../../services/settings.service';
import { flatEquality, collectChanges } from 'src/app/shared/helpers';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['personal.component.css']
})
export class PersonalComponent extends Unsubscribe implements OnInit {

  public user: User;
  public tempUser: User;
  public preloadedImg: string | ArrayBuffer;
  public clearFilesSubject = new Subject<boolean>();
  public progressBarVisibility: boolean;
  public goals = APP.goals;
  public activities = APP.activities;
  public rerender = false;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService,
    private realTimeDataService: RealTimeDataService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToUser();
  }

  public cancel(): void {
    this.tempUser = {...this.user};
    this.rerender = true;

    setTimeout(() => {
      this.rerender = false;
      this.changeDetectorRef.markForCheck();
    }, 0);
  }

  public reactOnSelectActivity(activity: string): void {
    this.tempUser.activity = activity;
  }

  public reactOnSelectGoal(goal: string): void {
    this.tempUser.goal = goal;
  }

  private subscribeToUser(): void {
    this.progressBarVisibility = true;
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
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

    this.subscribeTo = dialogRef.afterClosed()
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
    this.tempUser.height = this.tempUser.height ? Number(this.tempUser.height) : null;
    this.tempUser.weight = this.tempUser.weight ? Number(this.tempUser.weight) : null;
    this.tempUser.age = this.tempUser.age ? Number(this.tempUser.age) : null;

    return flatEquality(this.tempUser, this.user);
  }

  public async save(): Promise<any> {
    this.progressBarVisibility = true;
    await this.settingsService.updateUser(collectChanges(this.tempUser, this.user), this.user.id);
  }

}
