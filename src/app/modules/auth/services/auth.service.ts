import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import * as moment from 'moment';

import { User } from 'src/app/shared/models/user.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { SettingsService } from '../../settings/services/settings.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private localStorageService: LocalStorageHelper,
    private settingsService: SettingsService,
    private messaging: AngularFireMessaging
  ) {}

  public signUp(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(signUpResult => {
        Promise.all([
          this.sendEmailVerification(),
          this.createUser(user)
        ])
          .then(result => resolve())
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
  }

  public async signOut(): Promise<any> {
    const userId = this.localStorageService.getCachedData(APP.cachedData.userData).id;

    this.localStorageService.clearCachedData(APP.cachedData.userData);

    if ((window as any).FirebasePlugin) {
      await new Promise((resolve, reject) => {
        (window as any).FirebasePlugin.getToken(async token => {
          await this.settingsService.removeDeviceToken(userId, token);
          resolve();
        });
      });
    }
    else {
      this.messaging.requestToken
        .subscribe(token => this.settingsService.removeDeviceToken(userId, token));
    }

    return this.firebaseAuth.auth.signOut();
  }

  public signIn(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then(signInResult => {
          if (signInResult.user.emailVerified) {
            this.getUserInfo(user.email)
              .then(userSnapshot => {
                const userData = userSnapshot.docs[0].data();

                this.localStorageService.cacheData(APP.cachedData.userData, userData);
                resolve(userData);
              }).catch(error => reject(error));
          } else {
            reject('Email address not verified!');
          }
        }).catch(error => reject(error));
    });
  }

  public resetPassword(email: string): Promise<any> {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  public sendEmailVerification(): Promise<any> {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification();
  }

  private getUserInfo(email: string): Promise<QuerySnapshot<User>> {
    return this.firestore.collection('users').ref.where('email', '==', email).get();
  }

  private createUser(user: User): Promise<any> {
    const id = this.firestore.createId();

    return this.firestore.collection('users').doc(id).set({
      nickname: user.nickname,
      email: user.email,
      id,
      interfaceLanguage: 'English',
      notificationSound: true,
      sendDailyReportOnEmail: false,
      ownGoal: false,
      currentDay: {
        currentCalories: 0,
        currentProtein: 0,
        currentFats: 0,
        currentCarbohydrates: 0,
        products: []
      },
      addedProducts: [],
      deviceTokens: [],
      notificationTime: {
        title: '21:00',
        value: 21,
        utc: 21 - (moment().utcOffset() / 60)
      }
    });
  }

}
