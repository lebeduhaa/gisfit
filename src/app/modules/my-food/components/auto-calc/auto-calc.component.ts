import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';
import { APP } from 'src/app/shared/constants';
import { TotalCalculation, Calculation } from 'src/app/shared/models/calculation.model';

@Component({
  selector: 'app-auto-calc',
  templateUrl: 'auto-calc.component.html',
  styleUrls: ['auto-calc.component.css']
})
export class AutoCalcComponent implements OnInit {

  public selectedProducts: Product[];
  public displayedProducts: Product[];
  public products: Product[];

  constructor(
    private myFoodService: MyFoodService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  public reactOnSearchEvent(key: string): void {
    if (key) {
      this.displayedProducts = this.products.filter(product => product.productName.toLowerCase().includes(key.toLowerCase()));
    } else {
      this.displayedProducts = this.products;
    }
  }

  public calculate(): void {
    const totalCalculation: TotalCalculation = {
      totalCalories: 0,
      totalProtein: 0,
      totalFats: 0,
      totalCarbohydrates: 0,
      totalWeight: 0
    };

    this.selectedProducts.forEach(product => {
      totalCalculation.totalCalories += product.calories;
      totalCalculation.totalProtein += product.protein;
      totalCalculation.totalFats += product.fats;
      totalCalculation.totalCarbohydrates += product.carbohydrates;
      totalCalculation.totalWeight += Number(product.weight);
    });

    this.close({
      caloriesPer100Gram: Number(((totalCalculation.totalCalories * 100) / totalCalculation.totalWeight).toFixed(1)),
      proteinPer100Gram: Number(((totalCalculation.totalProtein * 100) / totalCalculation.totalWeight).toFixed(1)),
      fatsPer100Gram: Number(((totalCalculation.totalFats * 100) / totalCalculation.totalWeight).toFixed(1)),
      carbohydratesPer100Gram: Number(((totalCalculation.totalCarbohydrates * 100) / totalCalculation.totalWeight).toFixed(1)),
      products: this.selectedProducts
    });
  }

  public reactOnselectProducts(products: Product[]): void {
    this.selectedProducts = products;
  }

  public close(calculation?: Calculation): void {
    this.dialog.getDialogById(APP.dialogs.autoCalc).close(calculation);
  }

  private async getAllProducts(): Promise<void> {
    this.products = await this.myFoodService.getAllProducts();
    this.displayedProducts = this.products;
  }

}
