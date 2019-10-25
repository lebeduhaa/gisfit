import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: 'edit-product.component.html',
  styleUrls: ['edit-product.component.css']
})
export class EditProductComponent {

  public product: Product;
  public spinnerSubject = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) {
    this.product = dialogData.product;
  }

  public edit(): void {
    this.spinnerSubject.next(true);
  }

}
