import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import * as moment from 'moment';

import { ActivityService } from '../../services/activity.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { GoogleFit } from 'src/app/shared/models/google-fit.model';
import { ActivityChartData } from 'src/app/shared/models/activity-chart-data.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { GoogleApiService } from 'src/app/shared/services/gapi.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent extends Unsubscribe implements OnInit {

  public weight: ActivityChartData[] = [];
  public steps: ActivityChartData[] = [];
  public heartRate: ActivityChartData[] = [];
  public progressBarVisibility: boolean;
  public weightSubject = new Subject<ActivityChartData[]>();
  public stepsSubject = new Subject<ActivityChartData[]>();
  public heartSubject = new Subject<ActivityChartData[]>();

  private user: User;
  private intervalId;

  constructor(
    private activityService: ActivityService,
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService,
    private googleApiService: GoogleApiService,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
    this.getActualData();
  }

  private async getActivity(render: boolean): Promise<any> {
    const expirationTime = moment(this.user.accessTokenExpiresIn).diff(moment()) / 1000 / 60;

    if (expirationTime < 2) {
      const newAccessToken = await this.googleApiService.refreshAccessToken();

      await this.settingsService.updateUserData({
        accessToken: newAccessToken,
        accessTokenExpiresIn: moment().add(1, 'h').valueOf()
      }, this.user.id);
      this.user.accessToken = newAccessToken;
      this.user.accessTokenExpiresIn = moment().add(1, 'h').valueOf();
    }

    const activity = await this.activityService.getActivity(this.user.accessToken);

    this.groupWeight(activity);
    this.groupSteps(activity);
    this.groupHeartRate(activity);
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);

    if (render) {
      this.changeDetectorRef.markForCheck();
    }
  }

  private subscribeToCurrentUser(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.getActivity(true);
      });
  }

  private groupHeartRate(googleFit: GoogleFit[]): void {
    const tempHeartRate: ActivityChartData[] = [];

    googleFit[2].point.forEach(heartPoint => {
      tempHeartRate.push({
        data: heartPoint.value[0].fpVal,
        date: new Date(heartPoint.startTimeNanos / 1000000)
      });
    });

    if (tempHeartRate.length !== this.heartRate.length) {
      this.heartRate = tempHeartRate;
      setTimeout(() => {
        this.heartSubject.next(this.heartRate);
      }, 0);
    }
  }

  private groupWeight(googleFit: GoogleFit[]): void {
    const tempWeight: ActivityChartData[] = [];

    googleFit[0].point.forEach(weightPoint => {
      tempWeight.push({
        data: weightPoint.value[0].fpVal,
        date: new Date(weightPoint.startTimeNanos / 1000000)
      });
    });

    if (tempWeight.length !== this.weight.length) {
      this.weight = tempWeight;
      setTimeout(() => {
        this.weightSubject.next(this.weight);
      }, 0);
    }
  }

  private groupSteps(googleFit: GoogleFit[]): void {
    const tempSteps: ActivityChartData[] = [];

    googleFit[1].point.forEach(stepPoint => {
      let newValue = true;

      tempSteps.forEach(tempStep => {
        if (this.equalDates(new Date(stepPoint.startTimeNanos / 1000000), new Date(tempStep.date))) {
          tempStep.data += stepPoint.value[0].intVal;
          newValue = false;
        }
      });

      if (newValue) {
        tempSteps.push({
          data: stepPoint.value[0].intVal,
          date: new Date(stepPoint.startTimeNanos / 1000000)
        });
      }
    });

    if (this.steps.length !== tempSteps.length || this.steps[this.steps.length - 1].data !== tempSteps[tempSteps.length - 1].data) {
      this.steps = tempSteps;
      setTimeout(() => {
        this.stepsSubject.next(this.steps);
      }, 0);
    }
  }

  private equalDates(firstDate: Date, secondData: Date): boolean {
    return firstDate.getFullYear() === secondData.getFullYear() &&
           firstDate.getMonth() === secondData.getMonth() &&
           firstDate.getDate() === secondData.getDate();
  }

  private getActualData(): void {
    this.intervalId = setInterval(() => {
      this.getActivity(false);
    }, 10000);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    clearInterval(this.intervalId);
  }

}
