import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Preview } from 'src/app/shared/models/preview.model';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-current-progress',
  templateUrl: 'current-progress.component.html',
  styleUrls: ['current-progress.component.css']
})
export class CurrentProgressComponent implements OnInit, OnDestroy {

  public caloriesGoal: number;
  public proteinGoal: number;
  public fatsGoal: number;
  public carbohydratesGoal: number;
  public currentCalories = 0;
  public currentProtein = 0;
  public currentFats = 0;
  public currentCarbohydrates = 0;
  public currentCaloriesPercent = 0;
  public currentProteinPercent = 0;
  public currentFatsPercent = 0;
  public currentCarbohydratesPercent = 0;
  public caloriesPreview = 0;
  public proteinPreview = 0;
  public fatsPreview = 0;
  public carbohydratesPreview = 0;
  public caloriesPreviewNumber: string;
  public proteinPreviewNumber: string;
  public fatsPreviewNumber: string;
  public carbohydratesPreviewNumber: string;
  public user: User;

  private userSubscription: Subscription;
  private previewSubscription: Subscription;
  private clearPreviewSubscription: Subscription;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.subscribeToUser();
    this.subscribeToPreview();
    this.subscribeToClearPreview();
  }

  public reactOnChangeGoal(ownGoal: boolean): void {
    this.settingsService.updateUserData({ownGoal}, this.user.id)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: ownGoal ? 'Custom goals' : 'Calculated goals',
          body: ownGoal ? 'Now you use the custom goals' : 'Now you use the calculated goals',
          duration: 5000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  private subscribeToClearPreview(): void {
    this.clearPreviewSubscription = this.subjectService.getSubject(APP.subjects.clearPreview)
      .subscribe(() => this.clear());
  }

  private subscribeToUser(): void {
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.caloriesGoal = user.ownGoal ? user.customCaloriesGoal : user.caloriesGoal;
        this.proteinGoal = user.ownGoal ? user.customProteinGoal : user.proteinGoal;
        this.fatsGoal = user.ownGoal ? user.customFatsGoal : user.fatsGoal;
        this.carbohydratesGoal = user.ownGoal ? user.customCarbohydratesGoal : user.carbohydratesGoal;
        this.currentCalories = user.currentDay.currentCalories;
        this.currentProtein = user.currentDay.currentProtein;
        this.currentFats = user.currentDay.currentFats;
        this.currentCarbohydrates = user.currentDay.currentCarbohydrates;
        this.currentCaloriesPercent = (100 * this.currentCalories) / this.caloriesGoal;
        this.currentProteinPercent = (100 * this.currentProtein) / this.proteinGoal;
        this.currentFatsPercent = (100 * this.currentFats) / this.fatsGoal;
        this.currentCarbohydratesPercent = (100 * this.currentCarbohydrates) / this.carbohydratesGoal;
        this.clear();
      });
  }

  public disableGoalTrigger(): boolean {
    return !(this.user && this.user.customCaloriesGoal && this.user.customProteinGoal && this.user.customFatsGoal && this.user.customCarbohydratesGoal);
  }

  private clear(): void {
    this.caloriesPreview = 0;
    this.proteinPreview = 0;
    this.fatsPreview = 0;
    this.carbohydratesPreview = 0;
    this.caloriesPreviewNumber = '';
    this.proteinPreviewNumber = '';
    this.fatsPreviewNumber = '';
    this.carbohydratesPreviewNumber = '';
  }

  private subscribeToPreview(): void {
    this.previewSubscription = this.subjectService.getSubject(APP.subjects.preview)
      .subscribe((preview: Preview) => {
        this.caloriesPreviewNumber = preview.calories.toFixed(3);
        this.proteinPreviewNumber = preview.protein.toFixed(3);
        this.fatsPreviewNumber = preview.fats.toFixed(3);
        this.carbohydratesPreviewNumber = preview.carbohydrates.toFixed(3);

        if (preview.add) {
          this.caloriesPreview += (100 * preview.calories) / this.caloriesGoal;
          this.proteinPreview += (100 * preview.protein) / this.proteinGoal;
          this.fatsPreview += (100 * preview.fats) / this.fatsGoal;
          this.carbohydratesPreview += (100 * preview.carbohydrates) / this.carbohydratesGoal;
        } else {
          this.caloriesPreview -= (100 * preview.calories) / this.caloriesGoal;
          this.proteinPreview -= (100 * preview.protein) / this.proteinGoal;
          this.fatsPreview -= (100 * preview.fats) / this.fatsGoal;
          this.carbohydratesPreview -= (100 * preview.carbohydrates) / this.carbohydratesGoal;
        }
      });
  }

  ngOnDestroy() {}

}
