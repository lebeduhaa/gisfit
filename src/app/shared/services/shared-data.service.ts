import { Injectable } from '@angular/core';

import { CurrentEat } from '../models/current-eat.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public selectedProductCategories: string[] = [];
  public selectedDishCategories: string[] = [];
  public currentEating: CurrentEat[] = [];
  public products: Product[] = [];

}
