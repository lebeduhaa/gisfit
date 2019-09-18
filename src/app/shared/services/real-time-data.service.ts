import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { LocalStorageHelper } from './local-storage.service';
import { APP } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper,
  ) {}

  public subscribeToCurrentUserData(): Observable<User> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('users').doc(userId).valueChanges();
  }

}
