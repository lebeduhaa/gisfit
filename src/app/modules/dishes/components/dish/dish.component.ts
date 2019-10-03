import { Component, Input } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-dish',
  templateUrl: 'dish.component.html',
  styleUrls: ['dish.component.css']
})
export class DishComponent {

  @Input() dish: Product[];

}
