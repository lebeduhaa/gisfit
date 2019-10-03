import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { Product } from 'src/app/shared/models/product.model';
import { DishesService } from '../../services/dishes.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { APP } from 'src/app/shared/constants';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-dishes',
  templateUrl: 'dishes.component.html',
  styleUrls: ['dishes.component.css']
})
export class DishesComponent extends FirebaseCloudMessaging implements OnInit, OnDestroy {

  public dishes: Product[];
  public displayedDishes: Product[];
  public progressBarVisibility: boolean;

  private productSubscription: Subscription;

  constructor(
    private dishesService: DishesService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    private localStorageHelper: LocalStorageHelper
  ) {
    super(null, null, null);
  }

  ngOnInit() {
    this.getDishes();
    this.subscribeToProductChanges();
  }

  public reactOnSetLike(dishId: string): void {
    Promise.resolve(this.dishesService.setLike(dishId));
  }

  public reactOnUnsetLike(dishId: string): void {
    Promise.resolve(this.dishesService.unsetLike(dishId));
  }

  private getDishes(): void {
    this.progressBarVisibility = true;
    this.dishesService.getDishes()
      .then(dishes => {
        this.dishes = dishes;
        this.displayedDishes = dishes;
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.displayedDishes.push(dishes[0]);
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeToProductChanges(): void {
    this.productSubscription = this.realTimeDataService.subscribeToProducts()
      .subscribe(changes => {
        switch (changes[0].type) {
          case APP.dataActions.modified: {
            const dishData = changes[0].payload.doc.data() as Product;
            const dishMainIndex = this.dishes.findIndex(dish => dish.id === dishData.id);
            const dishDisplayedIndex = this.displayedDishes.findIndex(dish => dish.id === dishData.id);

            this.dishes.splice(dishMainIndex, 1, dishData);
            this.displayedDishes.splice(dishMainIndex, 1, dishData);
            this.changeDetectorRef.markForCheck();
          }
        }
      });
  }

  ngOnDestroy() {}

}
