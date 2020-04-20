import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { APP } from 'src/app/shared/constants';
import { Product } from 'src/app/shared/models/product.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';
import { TotalCalculation, Calculation } from 'src/app/shared/models/calculation.model';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-mobile-auto-calc',
  templateUrl: 'mobile-auto-calc.component.html',
  styleUrls: ['mobile-auto-calc.component.css']
})
export class MobileAutoCalcComponent extends Unsubscribe implements OnInit {

  public isMobile = APP.isMobile;
  public selectedProducts: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToProductSelection();
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

  public reactOnDelete(index: number): void {
    this.selectedProducts.splice(index, 1);
  }

  public close(result?: Calculation): void {
    this.dialog.getDialogById(APP.dialogs.autoCalc).close(result);
  }

  private subscribeToProductSelection(): void {
    this.subscribeTo = this.subjectService.getSubject(APP.subjects.mobileEating)
      .subscribe(product => this.reactOnNewProduct(product));
  }

  private reactOnNewProduct(newProduct: CurrentEat): void {
    if (newProduct.weight) {
      this.selectedProducts.push({
        productName: newProduct.product.productName,
        calories: Number((newProduct.product.calories * newProduct.howMuch * 0.01).toFixed(3)),
        protein: Number((newProduct.product.protein * newProduct.howMuch * 0.01).toFixed(3)),
        fats: Number((newProduct.product.fats * newProduct.howMuch * 0.01).toFixed(3)),
        carbohydrates: Number((newProduct.product.carbohydrates * newProduct.howMuch * 0.01).toFixed(3)),
        weight: newProduct.howMuch,
        image: newProduct.product.image
      });
    } else {
      for (let index = 0; index < newProduct.howMuch; index++) {
        const product = {...newProduct.product};

        product.calories = Number((product.calories * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.protein = Number((product.protein * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.fats = Number((product.fats * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.carbohydrates = Number((product.carbohydrates * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        this.selectedProducts.push({...product, weight: newProduct.product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch)});
      }
    }
  }

}
