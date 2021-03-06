import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';
import { APP } from 'src/app/shared/constants';
import { TotalCalculation, Calculation } from 'src/app/shared/models/calculation.model';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-auto-calc',
  templateUrl: 'auto-calc.component.html',
  styleUrls: ['auto-calc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCalcComponent implements OnInit {

  public selectedProducts: Product[];
  public displayedProducts: Product[];
  public products: Product[];
  public isMobile = APP.isMobile;

  constructor(
    private myFoodService: MyFoodService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private subjectService: SubjectService
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
      totalWeight: totalCalculation.totalWeight,
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
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.products = await this.myFoodService.getAllProducts();
    this.displayedProducts = this.products;
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    this.changeDetectorRef.markForCheck();
  }

}
