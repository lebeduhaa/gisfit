import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-my-food',
  templateUrl: 'my-food.component.html',
  styleUrls: ['my-food.component.css']
})
export class MyFoodComponent implements OnInit {

  public progressBarVisibility: boolean;
  public products: Product[];

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMyProducts();
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

}
