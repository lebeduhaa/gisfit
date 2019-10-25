import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import { Product } from 'src/app/shared/models/product.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { Day } from 'src/app/shared/models/day.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MyFoodService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper,
    private fireStorage: AngularFireStorage
  ) {}

  public deleteProduct(productId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('users').doc(userId).update({addedProducts: firebase.firestore.FieldValue.arrayRemove(productId)});
  }

  public async submitCurrentEating(products: Product[]): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const user = await this.firestore.collection('users').doc(userId).get().toPromise();
    const currentDay: Day = user.data().currentDay;

    currentDay.products = currentDay.products.concat(products);

    products.forEach(product => {
      currentDay.currentCalories += Number(product.calories);
      currentDay.currentProtein += Number(product.protein);
      currentDay.currentFats += Number(product.fats);
      currentDay.currentCarbohydrates += Number(product.carbohydrates);
    });

    currentDay.currentCalories = Number(currentDay.currentCalories.toFixed(3));
    currentDay.currentProtein = Number(currentDay.currentProtein.toFixed(3));
    currentDay.currentFats = Number(currentDay.currentFats.toFixed(3));
    currentDay.currentCarbohydrates = Number(currentDay.currentCarbohydrates.toFixed(3));

    await user.ref.update({currentDay});
  }

  public async createMyProduct(product: Product): Promise<any> {
    const id = this.firestore.createId();
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const base64 = product.image;
    const pureBase64 = base64.slice(base64.toString().indexOf('base64,') + 7);

    product.calories = Number(product.calories);
    product.protein = Number(product.protein);
    product.fats = Number(product.fats);
    product.carbohydrates = Number(product.carbohydrates);

    delete product.image;

    if (!product.user) {
      product.user = {
        id: userId
      };
    } else {
      product.user.id = userId;
    }

    const promises = [
      this.firestore.collection('products').doc(id).set({...product, id}),
      this.firestore.collection('users').doc(userId).update({addedProducts: firebase.firestore.FieldValue.arrayUnion(id)}),
      this.fireStorage.ref(`products/${id}.jpg`).putString(pureBase64.toString(), 'base64')
    ];

    return id;
  }

  public async getMyProducts(user: User): Promise<any> {
    const products = await this.firestore.collection('products').get().toPromise();

    return products.docs.map(doc => doc.data()).filter(doc => user.addedProducts.includes(doc.id));
  }

  public async getNotMyProducts(user: User): Promise<any> {
    const products = await this.firestore.collection('products').get().toPromise();

    return products.docs.map(doc => doc.data()).filter(doc => !user.addedProducts.includes(doc.id));
  }

  public addProductToMyFood(productId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('users').doc(userId).update({addedProducts: firebase.firestore.FieldValue.arrayUnion(productId)});
  }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.firestore.collection('products').get().toPromise();

    return products.docs.map(doc => doc.data());
  }

}
