import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';
import { Product } from 'src/app/shared/models/product.model';

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
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToNewProduct();
  }

  private subscribeToNewProduct(): void {
    this.newProductSubscription = this.subjectService.getSubject(APP.subjects.newProduct)
      .subscribe((newProduct: CurrentEat) => {
        setTimeout(() => {
          if (newProduct.weight) {
            this.products.push({
              productName: newProduct.product.productName,
              calories: newProduct.product.calories * newProduct.howMuch * 0.01,
              protein: newProduct.product.protein * newProduct.howMuch * 0.01,
              fats: newProduct.product.fats * newProduct.howMuch * 0.01,
              carbohydrates: newProduct.product.carbohydrates * newProduct.howMuch * 0.01,
              weight: newProduct.howMuch,
              image: newProduct.product.image
            });
          } else {
            for (let index = 0; index < newProduct.howMuch; index++) {
              this.products.push({...newProduct.product, weight: newProduct.product.averageMassOfOnePiece});
            }
          }

          this.changeDetectorRef.markForCheck();
        }, 700);
      });
  }

  ngOnDestroy() {}

}
