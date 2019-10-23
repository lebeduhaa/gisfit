import { Directive, HostListener, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { HistoryFoodComponent } from '../components/history-food/history-food.component';
import { Product } from 'src/app/shared/models/product.model';

@Directive({
  selector: '[appOpenHistoryFood]'
})
export class OpenHistoryFoodDirective {

  @Input() products: Product[];

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openHistoryFood(): void {
    this.dialog.open(HistoryFoodComponent, {
      width: '600px',
      data: {
        products: this.products
      }
    });
  }

}
