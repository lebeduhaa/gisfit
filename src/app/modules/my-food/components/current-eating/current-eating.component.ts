import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';
import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-current-eating',
  templateUrl: 'current-eating.component.html',
  styleUrls: ['current-eating.component.css']
})
export class CurrentEatingComponent extends Unsubscribe implements OnInit {

  @Output() selectProducts = new EventEmitter<Product[]>();

  @Input() selection: boolean;

  public isMobile = APP.isMobile;

  constructor(
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private myFoodService: MyFoodService,
    public sharedDataService: SharedDataService
  ) {
    super();
  }

  ngOnInit() {
    this.getCurrentEating();
    this.subscribeToNewProduct();
  }

  public clear(): void {
    this.subjectService.emitSubject(APP.subjects.subCurrentProducts, this.sharedDataService.products.length);
    this.sharedDataService.products = [];
    this.sharedDataService.currentEating = [];
    this.sharedDataService.previewData = [];
    this.subjectService.emitSubject(APP.subjects.closeMobileEatings, {});
    this.subjectService.emitSubject(APP.subjects.clearPreview, {});
  }

  public submitCurrentEating(): void {
    const products = this.sharedDataService.products;
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.clear();
    this.myFoodService.submitCurrentEating(products)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        
        if (!APP.isMobile) {
          this.subjectService.emitSubject(APP.subjects.subCurrentProducts, products.length);
        }

        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Current Eating',
          body: 'Your current eating was submit successfully, track you daily progress!',
          duration: 10000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Current Eating ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  public reactOnDelete(index: number): void {
    const product = this.sharedDataService.products[index];
    const preview = {
      add: false,
      calories: product.calories,
      protein: product.protein,
      fats: product.fats,
      carbohydrates: product.carbohydrates
    };

    this.sharedDataService.previewData.push(preview);
    this.subjectService.emitSubject(APP.subjects.preview, preview);
    this.sharedDataService.products.splice(index, 1);
    this.subjectService.emitSubject(APP.subjects.subCurrentProducts, 1);

    if (!this.sharedDataService.products.length) {
      this.subjectService.emitSubject(APP.subjects.closeMobileEatings, {});
    }
    if (this.sharedDataService.products.length === 0) {
      this.subjectService.emitSubject(APP.subjects.clearPreview, {});
      this.sharedDataService.currentEating = [];
    }
  }

  private getCurrentEating(): void {
    if (!this.sharedDataService.products.length) {
      this.sharedDataService.currentEating.forEach(newProduct => this.reactOnNewProduct(newProduct));
    }
  }

  private reactOnNewProduct(newProduct: CurrentEat): void {
    if (newProduct.weight) {
      this.sharedDataService.products.push({
        productName: newProduct.product.productName,
        calories: Number((newProduct.product.calories * newProduct.howMuch * 0.01).toFixed(3)),
        protein: Number((newProduct.product.protein * newProduct.howMuch * 0.01).toFixed(3)),
        fats: Number((newProduct.product.fats * newProduct.howMuch * 0.01).toFixed(3)),
        carbohydrates: Number((newProduct.product.carbohydrates * newProduct.howMuch * 0.01).toFixed(3)),
        weight: newProduct.howMuch,
        image: newProduct.product.image,
        id: newProduct.product.id
      });
    } else {
      for (let index = 0; index < newProduct.howMuch; index++) {
        const product = {...newProduct.product};

        product.calories = Number((product.calories * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.protein = Number((product.protein * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.fats = Number((product.fats * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        product.carbohydrates = Number((product.carbohydrates * product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch) * 0.01).toFixed(3));
        this.sharedDataService.products.push({...product, weight: newProduct.product.averageMassOfOnePiece * (newProduct.howMuch >= 1 ? 1 : newProduct.howMuch)});
      }
    }
  }

  private subscribeToNewProduct(): void {
    this.subscribeTo = this.subjectService.getSubject(APP.subjects.newProduct)
      .subscribe((newProduct: CurrentEat) => {
        setTimeout(() => {
          this.reactOnNewProduct(newProduct);

          this.selectProducts.emit(this.sharedDataService.products);
          this.changeDetectorRef.markForCheck();
        }, 700);
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.sharedDataService.products = [];
  }

}
