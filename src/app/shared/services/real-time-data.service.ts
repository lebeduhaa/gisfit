import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

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

    if (userId) {
      return this.firestore.collection('users').doc(userId).valueChanges();
    }

    return new Observable(observer => observer.next(null));
  }

  public subscribeToProducts(): Observable<DocumentChangeAction<unknown>[]> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    if (userId) {
      return this.firestore.collection('products').stateChanges();
    }

    return new Observable(observer => observer.next(null));
  }

  public subscribeToVideos(): Observable<DocumentChangeAction<unknown>[]> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    if (userId) {
      return this.firestore.collection('videos').stateChanges();
    }

    return new Observable(observer => observer.next(null));
  }

}
