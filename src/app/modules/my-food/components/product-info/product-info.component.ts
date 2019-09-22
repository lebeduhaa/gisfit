import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-info',
  templateUrl: 'product-info.component.html',
  styleUrls: ['product-info.component.css']
})
export class ProductInfoComponent {

  public product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) {
    this.product = dialogData.product;
  }

}
