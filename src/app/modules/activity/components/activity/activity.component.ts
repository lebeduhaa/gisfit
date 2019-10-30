import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ActivityService } from '../../services/activity.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { GoogleFit } from 'src/app/shared/models/google-fit.model';
import { ActivityChartData } from 'src/app/shared/models/activity-chart-data.model';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  public weight: ActivityChartData[] = [];

  private currentUserSubscription: Subscription;
  private user: User;
  private intervalId;

  constructor(
    private activityService: ActivityService,
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
    this.getActualData();
  }

  private async getActivity(): Promise<any> {
    const activity = await this.activityService.getActivity(this.user.accessToken);

    this.groupActivity(activity);
  }

  private subscribeToCurrentUser(): void {
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.getActivity();
      });
  }

  private groupActivity(googleFit: GoogleFit[]): void {
    const tempWeight: ActivityChartData[] = [];

    googleFit[0].point.forEach(weightPoint => {
      tempWeight.push({
        data: weightPoint.value[0].fpVal,
        date: new Date(weightPoint.startTimeNanos / 1000000)
      });
    });

    if (tempWeight.length !== this.weight.length) {
      this.weight = tempWeight;
      this.changeDetectorRef.markForCheck();
    }
  }

  private getActualData(): void {
    this.intervalId = setInterval(() => {
      this.getActivity();
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
