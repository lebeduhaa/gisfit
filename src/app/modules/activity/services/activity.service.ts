import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
  ) {}

  public async getActivity(accessToken: string): Promise<any> {
    const activity = await this.http.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      aggregateBy : [
        {
          dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight'
        },
        {
          dataTypeName: 'com.google.step_count.delta',
          dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
        },
        {
          dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm'
        }
      ],
        startTimeMillis: moment().subtract(89, 'd').valueOf(),
        endTimeMillis: new Date().valueOf()
      }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).toPromise();

    return (activity as any).bucket[0].dataset;
  }

}
