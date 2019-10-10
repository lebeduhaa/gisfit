import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-dish-details',
  templateUrl: 'dish-details.component.html',
  styleUrls: ['dish-details.component.css']
})
export class DishDetailsComponent {

  public dish: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) {
    this.dish = dialogData.dish;
  }



}
