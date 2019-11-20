import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { APP } from '../../constants';

@Component({
  selector: 'app-dish-details',
  templateUrl: 'dish-details.component.html',
  styleUrls: ['dish-details.component.css']
})
export class DishDetailsComponent {

  public dish: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog
  ) {
    this.dish = dialogData.dish;
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.dishDetails).close();
  }

}
