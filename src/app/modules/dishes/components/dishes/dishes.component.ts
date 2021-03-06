import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import * as recursiveDiff from 'recursive-diff';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { Product } from 'src/app/shared/models/product.model';
import { DishesService } from '../../services/dishes.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { APP } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-dishes',
  templateUrl: 'dishes.component.html',
  styleUrls: ['dishes.component.css']
})
export class DishesComponent extends FirebaseCloudMessaging implements OnInit {

  public dishes: Product[];
  public displayedDishes: Product[];
  public user: User;

  constructor(
    private dishesService: DishesService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService,
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog,
    private subjectService: SubjectService
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.getDishes();
    this.subscribeToCurrentUser();
    this.subscribeToProductChanges();
  }

  public reactOnSearchEvent(key: string): void {
    if (key) {
      this.displayedDishes = this.dishes.filter(dish => dish.productName.toLowerCase().includes(key.toLowerCase()));
    } else {
      this.displayedDishes = this.dishes;
    }
  }

  public reactOnSetLike(dishId: string): void {
    Promise.resolve(this.dishesService.setLike(dishId));
  }

  public reactOnUnsetLike(dishId: string): void {
    Promise.resolve(this.dishesService.unsetLike(dishId));
  }

  private getDishes(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.dishesService.getDishes()
      .then(dishes => {
        this.dishes = dishes;
        this.displayedDishes = dishes;
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.getRouteState();
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeToProductChanges(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToProducts()
      .subscribe(changes => {
        switch (changes[0].type) {
          case APP.dataActions.modified: {
            const dishData = changes[0].payload.doc.data() as Product;
            const dishMainIndex = this.dishes.findIndex(dish => dish.id === dishData.id);
            const dishDisplayedIndex = this.displayedDishes.findIndex(dish => dish.id === dishData.id);
            const delta = recursiveDiff.getDiff(this.dishes[dishMainIndex], dishData);

            recursiveDiff.applyDiff(this.dishes[dishMainIndex], delta);
            recursiveDiff.applyDiff(this.displayedDishes[dishDisplayedIndex], delta);
            this.changeDetectorRef.markForCheck();
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
          }
        }
      });
  }

  private subscribeToCurrentUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.changeDetectorRef.markForCheck();
      });
  }

  private scrollToBottom(): void {
    const chatComponents = document.querySelectorAll('.dish__comments-chat');

    chatComponents.forEach(chatComponent => {
      chatComponent.scrollTo({top: chatComponent.scrollHeight});
    });
  }

  private getRouteState(): void {
    const stateData = history.state.stateData;

    if (stateData) {
      const product = this.dishes.find(currentProduct => currentProduct.id === stateData.createdId);

      product.image = stateData.image;
    }
  }

}
