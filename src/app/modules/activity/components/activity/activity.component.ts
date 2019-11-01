import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';
import * as moment from 'moment';
import * as firebase from 'firebase';

import { ActivityService } from '../../services/activity.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { GoogleFit } from 'src/app/shared/models/google-fit.model';
import { ActivityChartData } from 'src/app/shared/models/activity-chart-data.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  public weight: ActivityChartData[] = [];
  public steps: ActivityChartData[] = [];
  public heartRate: ActivityChartData[] = [];
  public progressBarVisibility: boolean;
  public weightSubject = new Subject<ActivityChartData[]>();
  public stepsSubject = new Subject<ActivityChartData[]>();
  public heartSubject = new Subject<ActivityChartData[]>();

  private currentUserSubscription: Subscription;
  private user: User;
  private intervalId;

  constructor(
    private activityService: ActivityService,
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService,
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
    this.getActualData();
  }

  private async getActivity(render: boolean): Promise<any> {
    const expirationTime = moment(this.user.accessTokenExpiresIn).diff(moment()) / 1000 / 60;

    console.log(expirationTime);

    if (expirationTime < 2) {
      const refreshResult = await this.activityService.refreshToken(this.user.accessToken).toPromise();

      console.log({
        accessToken: refreshResult.access_token,
        refreshToken: refreshResult.refresh_token,
        accessTokenExpiresIn: moment().add(1, 'h').valueOf(),
        token_type: refreshResult.token_type
      });

      await this.settingsService.updateUserData({
        accessToken: refreshResult.access_token,
        refreshToken: refreshResult.refresh_token,
        accessTokenExpiresIn: moment().add(1, 'h').valueOf()
      }, this.user.id);
      this.user.accessToken = refreshResult.access_token;
      this.user.refreshToken = refreshResult.refresh_token;
      this.user.accessTokenExpiresIn = moment().add(1, 'h').valueOf();
    }

    const activity = await this.activityService.getActivity(this.user.accessToken);

    this.groupWeight(activity);
    this.groupSteps(activity);
    this.groupHeartRate(activity);
    this.progressBarVisibility = false;

    if (render) {
      this.changeDetectorRef.markForCheck();
    }
  }

  private subscribeToCurrentUser(): void {
    this.progressBarVisibility = true;

    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        console.log(this.auth.auth.currentUser);
        // this.auth.auth.currentUser.getIdToken(true).then(result => console.log(result));
        // this.activityService.refreshToken(this.user.accessToken).toPromise().then(console.log);
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
    clearInterval(this.intervalId);
  }

}
