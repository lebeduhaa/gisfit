import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.css']
})
export class ProductCardComponent {

  @Output() delete = new EventEmitter<any>();

  @Input() product: Product;
  @Input() history: boolean;

  public reactOnDelete(): void {
    this.delete.emit();
  }

}
