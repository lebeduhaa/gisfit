import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { toRightAnimation } from 'src/app/shared/animations';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { MatDialog } from '@angular/material/dialog';

@AutoUnsubscribe()
@Component({
  selector: 'app-my-food',
  templateUrl: 'my-food.component.html',
  styleUrls: ['my-food.component.css'],
  animations: [
    toRightAnimation
  ]
})
export class MyFoodComponent extends FirebaseCloudMessaging implements OnInit, OnDestroy {

  public progressBarVisibility: boolean;
  public products: Product[];
  public displayedProducts: Product[];
  public userFillRequiredData: boolean;
  public myProducts = true;
  public user: User;

  private currentUserSubscription: Subscription;
  private currentSearch: string;
  private currentCategories: string[];

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    private subjectService: SubjectService,
    protected settingsService: SettingsService,
    protected messaging: AngularFireMessaging,
    protected dialog: MatDialog
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public reactOnChangeTips(disableTips: boolean): void {
    this.settingsService.updateUserData({disableTips}, this.user.id)
      .then(() => this.user.disableTips = disableTips)
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  public reactOnSelectCategoryEvent(selectedCategories: string[]): void {
    this.currentCategories = selectedCategories;
    this.filterProducts();
  }

  public reactOnChangeGoal(ownGoal: boolean): void {
    this.settingsService.updateUserData({ownGoal}, this.user.id)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: ownGoal ? 'Custom goals' : 'Calculated goals',
          body: ownGoal ? 'Now you use the custom goals' : 'Now you use the calculated goals',
          duration: 5000
        });
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'ERROR',
          body: error.message,
          duration: 15000
        });
      });
  }

  public disableGoalTrigger(): boolean {
    return !(this.user && this.user.customCaloriesGoal && this.user.customProteinGoal && this.user.customFatsGoal && this.user.customCarbohydratesGoal);
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
    this.filterProducts();
  }

  public reactOnAddProduct(productId: string): void {
    this.progressBarVisibility = true;

    this.myFoodService.addProductToMyFood(productId)
    .then(() => {
      const productIndex = this.products.findIndex(product => product.id === productId);

      this.products.splice(productIndex, 1);
      this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
        title: 'Product add',
        body: 'Your product was added to your food successfully!',
        duration: 10000
      });
      this.progressBarVisibility = false;
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
      this.progressBarVisibility = false;
    });
  }

  public reactOnDeleteProduct(productId: string): void {
    this.progressBarVisibility = true;

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
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product deletion error',
          body: error.message,
          duration: 20000,
          error: true
        });
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  private filterProducts(): void {
    if (this.products) {
      this.displayedProducts = this.products.filter(product => {
        let category = true;
        let search = true;

        if (this.currentCategories && this.currentCategories.length !== 0) {
          category = this.currentCategories.includes(product.category);
        }

        if (this.currentSearch) {
          search = product.productName.toLowerCase().includes(this.currentSearch.toLowerCase());
        }

        return category && search;
      });
    }
  }

  private subscribeToCurrentUser(): void {
    this.progressBarVisibility = true;
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
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
    this.myFoodService.getMyProducts(this.user)
      .then(products => {
        this.progressBarVisibility = false;
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

  ngOnDestroy() {}

}
