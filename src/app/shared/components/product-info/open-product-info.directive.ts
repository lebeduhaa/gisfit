import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductInfoComponent } from './product-info.component';
import { Product } from 'src/app/shared/models/product.model';
import { APP } from '../../constants';

@Directive({
  selector: '[appOpenProductInfo]'
})
export class OpenProductInfoDirective {

  @Input() product: Product;
  @Input() disabled: boolean;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openProductDetails(): void {
    if (!this.disabled) {
      this.dialog.open(ProductInfoComponent, {
        data: {
          product: this.product
        },
        width: '400px',
        height: APP.isMobile ? '100%' : 'auto',
        id: APP.dialogs.productDetails
      });
    }
  }

}
