import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductInfoComponent } from '../components/product-info/product-info.component';
import { Product } from 'src/app/shared/models/product.model';

@Directive({
  selector: '[appOpenProductInfo]'
})
export class OpenProductInfoDirective {

  @Input() product: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openProductDetails(): void {
    this.dialog.open(ProductInfoComponent, {
      data: {
        product: this.product
      },
      width: '400px',
      height: 'auto'
    });
  }

}
