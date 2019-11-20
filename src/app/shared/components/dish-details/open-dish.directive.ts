import { Directive, HostListener, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { DishDetailsComponent } from './dish-details.component';
import { APP } from '../../constants';

@Directive({
  selector: '[appOpenDish]'
})
export class OpenDishDirective {

  @Input() dish: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click', ['$event'])
  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog.open(DishDetailsComponent, {
      width: '700px',
      maxWidth: '700px',
      data: {
        dish: this.dish
      },
      id: APP.dialogs.dishDetails
    });
  }

}
