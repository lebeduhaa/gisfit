import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public selectedProductCategories: string[] = [];
  public selectedDishCategories: string[] = [];
  public currentEating: Product[] = [];

}
