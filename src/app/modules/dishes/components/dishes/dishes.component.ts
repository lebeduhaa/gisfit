import { Component, OnInit } from '@angular/core';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { Product } from 'src/app/shared/models/product.model';
import { DishesService } from '../../services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: 'dishes.component.html',
  styleUrls: ['dishes.component.css']
})
export class DishesComponent extends FirebaseCloudMessaging implements OnInit {

  public dishes: Product[];

  constructor(
    private dishesService: DishesService
  ) {
    super(null, null, null);
  }

  ngOnInit() {
    this.dishesService.getDishes()
      .then(dishes => console.log(dishes));
  }

}
