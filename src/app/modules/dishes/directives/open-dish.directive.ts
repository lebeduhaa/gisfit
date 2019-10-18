import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishDetailsComponent } from '../components/dish-details/dish-details.component';
import { Product } from 'src/app/shared/models/product.model';

@Directive({
  selector: '[appOpenDish]'
})
export class OpenDishDirective {

  @Input() dish: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openDialog(): void {
    this.dialog.open(DishDetailsComponent, {
      width: '700px',
      maxWidth: '700px',
      data: {
        dish: this.dish
      }
    });
  }

}
