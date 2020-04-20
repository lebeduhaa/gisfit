import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

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
    private fireStorage: AngularFireStorage,
    private http: HttpClient
  ) {}

  public searchOutside(key: string): Observable<any> {
    return this.http.get(`${APP.searchOutsideUrl}?searchtext=${key}&lazy_steep=${1}`);
  }

  public deleteProduct(productId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userData).id;

    return this.firestore.collection('users').doc(userId).update({addedProducts: firebase.firestore.FieldValue.arrayRemove(productId)});
  }

  public async submitCurrentEating(products: Product[]): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userData).id;
    const user = await this.firestore.collection('users').doc(userId).get().toPromise();
    const currentDay: Day = user.data().currentDay;
    const promises = [];

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

    console.log(currentDay);

    promises.push(user.ref.update({currentDay}));
    
    products.forEach(product => {
      promises.push(this.firestore.collection('products').doc(product.id).update({popularity: firebase.firestore.FieldValue.increment(1)}));
    });

    await Promise.all(promises);
  }

  public async createMyProduct(product: Product): Promise<any> {
    const id = this.firestore.createId();
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userData).id;
    const base64 = product.image;
    const pureBase64 = base64.slice(base64.toString().indexOf('base64,') + 7);

    product.calories = Number(product.calories);
    product.protein = Number(product.protein);
    product.fats = Number(product.fats);
    product.carbohydrates = Number(product.carbohydrates);
    product.popularity = 0;

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
    const products = await this.firestore.collection('products').ref.orderBy('popularity', 'desc').get();

    return products.docs.map(doc => doc.data()).filter(doc => user.addedProducts.includes(doc.id));
  }

  public async getNotMyProducts(user: User): Promise<any> {
    const products = await this.firestore.collection('products').ref.orderBy('popularity', 'desc').get();

    return products.docs.map(doc => doc.data()).filter(doc => !user.addedProducts.includes(doc.id));
  }

  public addProductToMyFood(productId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userData).id;

    return this.firestore.collection('users').doc(userId).update({addedProducts: firebase.firestore.FieldValue.arrayUnion(productId)});
  }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.firestore.collection('products').ref.orderBy('popularity', 'desc').get();

    return products.docs.map(doc => doc.data());
  }

  public async editProduct(productId: string, productChanges: Product): Promise<any> {
    await this.firestore.collection('products').doc(productId).update(productChanges);
  }

}
