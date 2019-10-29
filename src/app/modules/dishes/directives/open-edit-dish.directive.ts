import { Directive, HostListener, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { EditDishComponent } from '../components/edit-dish/edit-dish.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenEditDish]'
})
export class OpenEditDishDirective {

  @Input() dish: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click', ['$event'])
  openEditDishDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog.open(EditDishComponent, {
      id: APP.dialogs.editDish,
      data: {
        dish: this.dish
      },
      width: '450px'
    });
  }

}
