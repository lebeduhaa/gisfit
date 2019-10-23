import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-history-food',
  templateUrl: 'history-food.component.html',
  styleUrls: ['history-food.component.css']
})
export class HistoryFoodComponent {

  public products: Product[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) {
    this.products = this.dialogData.products;
  }

}
