import { Injectable } from '@angular/core';

import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Product } from 'src/app/shared/models/product.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MyFoodService {

  constructor(
    private firestore: AngularFirestore,
    private localStorageHelper: LocalStorageHelper,
    private fireStorage: AngularFireStorage
  ) {}

  public deleteProduct(productId: string): void {
    console.log(productId);
  }

  public async createMyProduct(product: Product): Promise<any> {
    const id = this.firestore.createId();
    const base64 = product.image;
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const pureBase64 = base64.slice(base64.toString().indexOf('base64,') + 7);

    delete product.image;
    await this.firestore.collection('products').doc(id).set({...product, id, userId});
    await this.fireStorage.ref(`products/${id}.jpg`).putString(pureBase64.toString(), 'base64');
  }

  public async getMyProducts(): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
    const products = await this.firestore.collection('products').ref.where('userId', '==', userId).get();

    return products.docs.map(doc => doc.data());
  }

}
