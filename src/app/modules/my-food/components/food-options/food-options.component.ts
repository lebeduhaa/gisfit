import { Component, OnInit } from '@angular/core';

import { APP } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';

import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { User } from 'src/app/shared/models/user.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';

@Component({
  selector: 'app-food-options',
  templateUrl: 'food-options.component.html',
  styleUrls: ['food-options.component.css']
})
export class FoodOptionsComponent implements OnInit {

  public user: User;

  private userSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private subjectService: SubjectService,
    private realTimeDataService: RealTimeDataService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public reactOnChangeTips(disableTips: boolean): void {
    this.settingsService.updateUserData({disableTips}, this.user.id)
      .then(() => this.user.disableTips = disableTips)
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  public disableGoalTrigger(): boolean {
    return !(this.user && this.user.customCaloriesGoal && this.user.customProteinGoal && this.user.customFatsGoal && this.user.customCarbohydratesGoal);
  }

  private subscribeToCurrentUser(): void {
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => this.user = user);
  }

}
