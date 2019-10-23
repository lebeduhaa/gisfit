import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';

@Component({
  selector: 'app-auto-calc',
  templateUrl: 'auto-calc.component.html',
  styleUrls: ['auto-calc.component.css']
})
export class AutoCalcComponent implements OnInit {

  public displayedProducts: Product[];

  private products: Product[];

  constructor(
    private myFoodService: MyFoodService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  private async getAllProducts(): Promise<void> {
    this.products = await this.myFoodService.getAllProducts();
    this.displayedProducts = this.products;
  }

}
