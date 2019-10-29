import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ActivityService } from '../../services/activity.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { GoogleFit } from 'src/app/shared/models/google-fit.model';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit {

  public weight: any[] = [];

  private currentUserSubscription: Subscription;
  private user: User;

  constructor(
    private activityService: ActivityService,
    private realTimeDataService: RealTimeDataService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
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
    googleFit[0].point.forEach(weightPoint => {
      console.log(weightPoint.startTimeNanos / 100000000);
      console.log(moment(weightPoint.startTimeNanos).format('MMMM Do YYYY'));
      this.weight.push({
        value: weightPoint.value[0].fpVal
      });
    });

    console.log(this.weight);
  }

}
