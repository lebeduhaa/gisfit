import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient
  ) {}

  public async googleSignIn(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/fitness.activity.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.activity.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.blood_glucose.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.blood_glucose.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.blood_pressure.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.blood_pressure.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.body.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.body.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.body_temperature.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.body_temperature.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.location.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.location.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.nutrition.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.nutrition.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.oxygen_saturation.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.oxygen_saturation.write');
    provider.addScope('https://www.googleapis.com/auth/fitness.reproductive_health.read');
    provider.addScope('https://www.googleapis.com/auth/fitness.reproductive_health.write');

    const signInResult = await this.auth.auth.signInWithPopup(provider);

    return signInResult;
  }

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
