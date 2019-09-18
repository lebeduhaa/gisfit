import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private subjectService: SubjectService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private firebaseAuth: AngularFireAuth,
  ) {}

  public uploadAvatar(base64: string, user: User): Promise<any> {
    if (base64) {
      const pureBase64 = base64.slice(base64.indexOf('base64,') + 7);

      return this.fireStorage.ref(`avatars/${user.email}.jpg`).putString(pureBase64, 'base64')
        .then(async img => {
          this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
            title: 'Avatar changed',
            body: `Your avatar was updated successfully!`,
            duration: 10000
          });
          this.updateUserAvatar(user);
        });
    }
  }

  private updateUserAvatar(user: User): Promise<any> {
    if (user.avatar === APP.defaultAvatar) {
      return this.firestore.collection('users').doc(user.id).update({avatar: `${user.email}.jpg`});
    }
  }

  public updateUser(user: User, userId: string): Promise<any> {
    const promises = [this.firestore.collection('users').doc(userId).update(user)];

    if (user.email) {
      promises.push(this.auth.auth.currentUser.updateEmail(user.email));
    }

    return Promise.all(promises).then(async () => {
      if (user.email) {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Email was changed!',
          body: `It seems like you changed your email address. You have to verify it again to use this application!`,
          duration: 10000
        });
        await this.authService.sendEmailVerification();
      }
    });
  }

  public updateUserPassword(password: string): Promise<any> {
    return this.firebaseAuth.auth.currentUser.updatePassword(password);
  }

}
