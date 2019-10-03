import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper
  ) {}

  public async getDishes(): Promise<any> {
    const dishes = await this.firestore.collection('products').ref.where('dish', '==', true).get();

    return dishes.docs.map(doc => doc.data());
  }

  public setLike(dishId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('products').doc(dishId).update({likes: firebase.firestore.FieldValue.arrayUnion(userId)});
  }

  public unsetLike(dishId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('products').doc(dishId).update({likes: firebase.firestore.FieldValue.arrayRemove(userId)});
  }

}
