import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { Product } from 'src/app/shared/models/product.model';
import { DishesService } from '../../services/dishes.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

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
    private realTimeDataService: RealTimeDataService
  ) {
    super(null, null, null);
  }

  ngOnInit() {
    this.getDishes();
    this.subscribeToProductChanges();
  }

  private getDishes(): void {
    this.progressBarVisibility = true;
    this.dishesService.getDishes()
      .then(dishes => {
        this.dishes = dishes;
        this.displayedDishes = dishes;
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeToProductChanges(): void {
    this.productSubscription = this.realTimeDataService.subscribeToProducts()
      .subscribe(changes => console.log(changes));
  }

  ngOnDestroy() {}

}
