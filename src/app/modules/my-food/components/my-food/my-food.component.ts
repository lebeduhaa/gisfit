import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@AutoUnsubscribe()
@Component({
  selector: 'app-my-food',
  templateUrl: 'my-food.component.html',
  styleUrls: ['my-food.component.css']
})
export class MyFoodComponent implements OnInit, OnDestroy {

  public progressBarVisibility: boolean;
  public products: Product[];

  private productsSubscription: Subscription;

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getMyProducts();
    this.subscribeToProductChanges();
  }

  public reactOnDeleteProduct(productId: string): void {
    this.progressBarVisibility = true;

    this.myFoodService.deleteProduct(productId)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product deletion',
          body: 'Your product was deleted successfully!',
          duration: 10000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product deletion error',
          body: error.message,
          duration: 20000,
          error: true
        });
      });
  }

  private getMyProducts(): void {
    this.progressBarVisibility = true;

    this.myFoodService.getMyProducts()
      .then(products => {
        this.progressBarVisibility = false;
        this.products = products;
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeToProductChanges(): void {
    this.productsSubscription = this.realTimeDataService.subscribeToProducts()
      .subscribe(data => {
        const actionType = data[0].type;

        this.progressBarVisibility = false;


        switch (actionType) {
          case APP.dataActions.removed:
            this.products.splice(data[0].payload.oldIndex, 1);
            break;
          default:
            console.log('unknown data action');
        }
      });
  }

  ngOnDestroy() {}

}
