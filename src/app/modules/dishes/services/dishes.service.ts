import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  public async getDishes(): Promise<any> {
    const dishes = await this.firestore.collection('products').ref.where('dish', '==', true).get();

    return dishes.docs.map(doc => doc.data());
  }

}
