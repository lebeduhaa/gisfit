import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { APP } from '../../constants';

@Component({
  selector: 'app-product-info',
  templateUrl: 'product-info.component.html',
  styleUrls: ['product-info.component.css']
})
export class ProductInfoComponent {

  public product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog
  ) {
    this.product = dialogData.product;
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.productDetails).close();
  }

}
