import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { toRightAnimation } from 'src/app/shared/animations';
import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-my-food',
  templateUrl: 'my-food.component.html',
  styleUrls: ['my-food.component.css'],
  animations: [
    toRightAnimation
  ]
})
export class MyFoodComponent extends FirebaseCloudMessaging implements OnInit {

  @ViewChild('scroll') scroll: VirtualScrollerComponent;

  public products: Product[];
  public displayedProducts: Product[];
  public userFillRequiredData: boolean;
  public myProducts = true;
  public user: User;
  public productCategories = APP.categories;
  public dishCategories = APP.dishCategories;
  public isMobile: boolean;
  public mobileVirtualScrollHeight: number;

  private currentSearch: string;
  private currentProductCategories: string[];
  private currentDishCategories: string[];

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService,
    protected settingsService: SettingsService,
    protected messaging: AngularFireMessaging,
    protected dialog: MatDialog,
    private sharedDataService: SharedDataService,
    private localStorageHelper: LocalStorageHelper
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.isMobile = APP.isMobile;
    this.calcMobileVirtualScrollHeight();
    this.subscribeToCurrentUser();
    this.clearSelectedProducts();
  }

  public reactOnSelectProductCategoryEvent(selectedCategories: string[]): void {
    this.currentProductCategories = selectedCategories;
    this.filterProducts();
  }

  public reactOnSelectDishCategoryEvent(selectedCategories: string[]): void {
    this.currentDishCategories = selectedCategories;
    this.filterProducts();
  }

  public findMoreProducts(): void {
    this.myProducts = false;
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.myFoodService.getNotMyProducts(this.localStorageHelper.getCachedData(APP.cachedData.userData))
      .then(products => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.products = products;
        this.displayedProducts = [...products];
        this.changeDetectorRef.markForCheck();
        this.getRouteState();
        this.filterProducts();
      });
  }

  public goBackToMyProducts(): void {
    this.myProducts = true;
    this.getMyProducts();
    this.filterProducts();
  }

  public reactOnSearch(searchKey: string): void {
    this.currentSearch = searchKey;
    this.filterProducts();
  }

  public reactOnAddProduct(productId: string): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    this.myFoodService.addProductToMyFood(productId)
    .then(() => {
      this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
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
      this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
    });
  }

  public reactOnDeleteProduct(productId: string): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    this.myFoodService.deleteProduct(productId)
      .then(() => {
        const productIndex = this.products.findIndex(product => product.id === productId);

        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product deletion',
          body: 'Your product was deleted successfully!',
          duration: 10000
        });
        this.products.splice(productIndex, 1);
        this.filterProducts();
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.changeDetectorRef.markForCheck();
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product deletion error',
          body: error.message,
          duration: 20000,
          error: true
        });
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.changeDetectorRef.markForCheck();
      });
  }

  private clearSelectedProducts(): void {
    this.sharedDataService.currentEating = [];
  }

  private filterProducts(): void {
    if (this.products) {
      this.displayedProducts = this.products.filter(product => {
        let productCategory = false;
        let dishCategory = false;
        let search = true;

        if (this.currentProductCategories && this.currentProductCategories.length !== 0) {
          productCategory = this.currentProductCategories.includes(product.category);
        }

        if (this.currentDishCategories && this.currentDishCategories.length !== 0) {
          dishCategory = this.currentDishCategories.includes(product.category);
        }

        if (this.currentSearch) {
          search = product.productName.toLowerCase().includes(this.currentSearch.toLowerCase());
        }

        if (
          (typeof this.currentProductCategories === 'undefined' || !this.currentProductCategories.length) &&
          (typeof this.currentDishCategories === 'undefined' || !this.currentDishCategories.length)
        ) {
          return search;
        }

        return search && (productCategory || dishCategory);
      });
    }
  }

  private calcMobileVirtualScrollHeight(): void {
    if (this.isMobile) {
      setTimeout(() => {
        const descriptionHeight = document.querySelector('.my-food__mobile-actions').clientHeight;

        this.mobileVirtualScrollHeight = window.innerHeight - 117 - descriptionHeight;
      }, 0);
    }
  }

  private subscribeToCurrentUser(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        if (user.height && user.weight && user.activity && user.goal && user.age && user.sex) {
          this.userFillRequiredData = true;
        }

        this.user = user;
        this.init(user);

        if (!this.products) {
          this.getMyProducts();
          this.filterProducts();
        }

        this.changeDetectorRef.markForCheck();
      });
  }

  private getMyProducts(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    this.myFoodService.getMyProducts(this.localStorageHelper.getCachedData(APP.cachedData.userData))
      .then(products => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.products = products;
        this.displayedProducts = [...products];
        this.changeDetectorRef.markForCheck();
        this.getRouteState();
      });
  }

  private getRouteState(): void {
    const stateData = history.state.stateData;

    if (stateData) {
      const product = this.products.find(currentProduct => currentProduct.id === stateData.createdId);

      product.image = stateData.image;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.sharedDataService.previewData = [];
  }

}
