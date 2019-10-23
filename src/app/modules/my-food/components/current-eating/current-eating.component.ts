import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';
import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-current-eating',
  templateUrl: 'current-eating.component.html',
  styleUrls: ['current-eating.component.css']
})
export class CurrentEatingComponent implements OnInit, OnDestroy {

  public products: Product[] = [];

  private newProductSubscription: Subscription;

  constructor(
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private myFoodService: MyFoodService
  ) {}

  ngOnInit() {
    this.subscribeToNewProduct();
  }

  public clear(): void {
    this.products = [];
    this.subjectService.emitSubject(APP.subjects.clearPreview, {});
  }

  public submitCurrentEating(): void {
    this.myFoodService.submitCurrentEating(this.products)
      .then(() => {
        this.products = [];
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Current Eating',
          body: 'Your current eating was submit successfully, track you daily progress!',
          duration: 10000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Current Eating ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  public reactOnDelete(index: number): void {
    const product = this.products[index];

    this.subjectService.emitSubject(APP.subjects.preview, {
      add: false,
      calories: product.calories,
      protein: product.protein,
      fats: product.fats,
      carbohydrates: product.carbohydrates
    });
    this.products.splice(index, 1);

    if (this.products.length === 0) {
      this.subjectService.emitSubject(APP.subjects.clearPreview, {});
    }
  }

  private subscribeToNewProduct(): void {
    this.newProductSubscription = this.subjectService.getSubject(APP.subjects.newProduct)
      .subscribe((newProduct: CurrentEat) => {
        setTimeout(() => {
          if (newProduct.weight) {
            this.products.push({
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

              product.calories = Number((product.calories * product.averageMassOfOnePiece * 0.01).toFixed(3));
              product.protein = Number((product.protein * product.averageMassOfOnePiece * 0.01).toFixed(3));
              product.fats = Number((product.fats * product.averageMassOfOnePiece * 0.01).toFixed(3));
              product.carbohydrates = Number((product.carbohydrates * product.averageMassOfOnePiece * 0.01).toFixed(3));
              this.products.push({...product, weight: newProduct.product.averageMassOfOnePiece});
            }
          }

          this.changeDetectorRef.markForCheck();
        }, 700);
      });
  }

  ngOnDestroy() {}

}
