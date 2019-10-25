import { Directive, HostListener, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appEditProduct]'
})
export class OpenEditProductDirective {

  @Input() product: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openEditProduct(): void {
    this.dialog.open(EditProductComponent, {
      id: APP.dialogs.editProduct,
      width: '500px',
      data: {
        product: this.product
      }
    });
  }

}
