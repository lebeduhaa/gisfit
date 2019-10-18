import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { History } from 'src/app/shared/models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper
  ) {}

  public async getUserHistory(date: Date): Promise<History[]> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const momentDate = moment(date);
    const history = await this.firestore.collection('history').ref
      .where('year', '==', momentDate.year())
      .where('month', '==', momentDate.month())
      .where('day', '==', momentDate.date()).get();

    if (history.docs[0]) {
      return history.docs[0].data()[userId];
    } else {
      return null;
    }
  }

}
