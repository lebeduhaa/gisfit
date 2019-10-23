import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { History } from 'src/app/shared/models/history.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { User } from 'src/app/shared/models/user.model';
import { ScoreChartData } from 'src/app/shared/models/score-chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper
  ) {}

  public async getUserHistory(date: Date): Promise<History> {
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

  public async getCurrentDayProgress(): Promise<History> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const currentUser: User = (await this.firestore.collection('users').doc(userId).get().toPromise()).data();

    return {
      caloriesGoal: currentUser.caloriesGoal,
      proteinGoal: currentUser.proteinGoal,
      fatsGoal: currentUser.fatsGoal,
      carbohydratesGoal: currentUser.carbohydratesGoal,
      resultCalories: currentUser.currentDay.currentCalories,
      resultProtein: currentUser.currentDay.currentProtein,
      resultFats: currentUser.currentDay.currentFats,
      resultCarbohydrates: currentUser.currentDay.currentCarbohydrates,
      products: currentUser.currentDay.products
    };
  }

  public async getScoreStatistics(): Promise<any> {
    const result: ScoreChartData[] = [];
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const statistics = (await this.firestore.collection('history').get().toPromise()).docs.map(doc => doc.data());

    statistics.forEach(history => {
      if (history[userId]) {
        result.push({
          date: new Date(history.year, history.month, history.day),
          totalScore: history[userId].totalScore
        });
      }
    });

    result.sort((a, b) => {
      return a.date.valueOf() - b.date.valueOf();
    });

    return result;
  }

  public async getDailyStatistics(): Promise<Statistics[]> {
    const result: Statistics[] = [];
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const statistics = (await this.firestore.collection('history').get().toPromise()).docs.map(doc => doc.data());

    statistics.forEach(history => {
      if (history[userId]) {
        result.push({
          year: history.year,
          month: history.month,
          day: history.day,
          caloriesGoal: history[userId].caloriesGoal,
          proteinGoal: history[userId].proteinGoal,
          fatsGoal: history[userId].fatsGoal,
          carbohydratesGoal: history[userId].carbohydratesGoal,
          caloriesResult: history[userId].resultCalories,
          proteinResult: history[userId].resultProtein,
          fatsResult: history[userId].resultFats,
          carbohydratesResult: history[userId].resultCarbohydrates,
          totalScore: history[userId].totalScore
        });
      }
    });

    result.sort((a, b) => {
      return new Date(a.year, a.month, a.day).valueOf() - new Date(b.year, b.month, b.day).valueOf();
    });

    return result;
  }

}
