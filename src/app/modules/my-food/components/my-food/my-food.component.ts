import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-my-food',
  templateUrl: 'my-food.component.html',
  styleUrls: ['my-food.component.css']
})
export class MyFoodComponent implements OnInit, OnDestroy {

  public progressBarVisibility: boolean;
  public products: Product[];
  public displayedProducts: Product[];
  public userFillRequiredData: boolean;
  public myProducts = true;

  private productsSubscription: Subscription;
  private currentUserSubscription: Subscription;
  private user: User;
  private currentSearch: string;

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subscribeToProductChanges();
    this.subscribeToCurrentUser();
  }

  public findMoreProducts(): void {
    this.myProducts = false;
    this.progressBarVisibility = true;
    this.myFoodService.getNotMyProducts(this.user)
      .then(products => {
        this.progressBarVisibility = false;
        this.products = products;
        this.displayedProducts = [...products];
        this.changeDetectorRef.markForCheck();
        this.getRouteState();
      });
  }

  public goBackToMyProducts(): void {
    this.myProducts = true;
    this.getMyProducts();
  }

  public reactOnSearch(searchKey: string): void {
    this.currentSearch = searchKey;

    if (searchKey) {
      this.displayedProducts = this.products.filter(product => product.productName.toLowerCase().includes(searchKey.toLowerCase()));
    } else {
      this.displayedProducts = [...this.products];
    }
  }

  public reactOnAddProduct(productId: string): void {
    this.myFoodService.addProductToMyFood(productId)
    .then(() => {
      const productIndex = this.products.findIndex(product => product.id === productId);

      this.products.splice(productIndex, 1);
      this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
        title: 'Product add',
        body: 'Your product was added to your food successfully!',
        duration: 10000
      });
      this.reactOnSearch(this.currentSearch);
      this.changeDetectorRef.markForCheck();
    })
    .catch(error => {
      this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
        title: 'Product addition error',
        body: error.message,
        duration: 20000,
        error: true
      });
    });
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

  private subscribeToCurrentUser(): void {
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        if (user.height && user.weight && user.activity && user.goal && user.age && user.sex) {
          this.userFillRequiredData = true;
        }

        this.user = user;

        if (!this.products) {
          this.getMyProducts();
        }

        this.changeDetectorRef.markForCheck();
      });
  }

  private getMyProducts(): void {
    this.progressBarVisibility = true;

    this.myFoodService.getMyProducts(this.user)
      .then(products => {
        this.progressBarVisibility = false;
        this.products = products;
        this.displayedProducts = [...products];
        this.changeDetectorRef.markForCheck();
        this.getRouteState();
      });
  }

  private subscribeToProductChanges(): void {
    this.productsSubscription = this.realTimeDataService.subscribeToProducts()
      .subscribe(data => {
        const actionType = data[0].type;

        this.progressBarVisibility = false;

        switch (actionType) {
          case APP.dataActions.removed: {
            const id = (data[0].payload.doc.data() as User).id;
            const productIndex = this.products.findIndex(product => product.id === id);
            this.products.splice(productIndex, 1);
            break;
          }
          default:
            console.log('unknown data action');
        }
      });
  }

  private getRouteState(): void {
    const stateData = history.state.stateData;

    if (stateData) {
      const product = this.products.find(currentProduct => currentProduct.id === stateData.createdId);

      product.image = stateData.image;
    }
  }

  ngOnDestroy() {}

}
