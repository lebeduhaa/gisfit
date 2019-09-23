import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Preview } from 'src/app/shared/models/preview.model';
import { APP } from 'src/app/shared/constants';

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

  private userSubscription: Subscription;
  private previewSubscription: Subscription;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subscribeToUser();
    this.subscribeToPreview();
  }

  private subscribeToUser(): void {
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.caloriesGoal = user.caloriesGoal;
        this.proteinGoal = user.proteinGoal;
        this.fatsGoal = user.fatsGoal;
        this.carbohydratesGoal = user.carbohydratesGoal;
        this.currentCalories = user.currentDay.currentCalories;
        this.currentProtein = user.currentDay.currentProtein;
        this.currentFats = user.currentDay.currentFats;
        this.currentCarbohydrates = user.currentDay.currentCarbohydrates;
        this.currentCaloriesPercent = (100 * this.currentCalories) / this.caloriesGoal;
        this.currentProteinPercent = (100 * this.currentProtein) / this.proteinGoal;
        this.currentFatsPercent = (100 * this.currentFats) / this.fatsGoal;
        this.currentCarbohydratesPercent = (100 * this.currentCarbohydrates) / this.carbohydratesGoal;
        this.caloriesPreview = 0;
        this.proteinPreview = 0;
        this.fatsPreview = 0;
        this.carbohydratesPreview = 0;
      });
  }

  private subscribeToPreview(): void {
    this.previewSubscription = this.subjectService.getSubject(APP.subjects.preview)
      .subscribe((preview: Preview) => {
        this.caloriesPreview += (100 * preview.calories) / this.caloriesGoal;
        this.proteinPreview += (100 * preview.protein) / this.proteinGoal;
        this.fatsPreview += (100 * preview.fats) / this.fatsGoal;
        this.carbohydratesPreview += (100 * preview.carbohydrates) / this.carbohydratesGoal;
      });
  }

  ngOnDestroy() {}

}
