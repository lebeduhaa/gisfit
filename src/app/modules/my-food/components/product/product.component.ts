import { Component, Input } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { appearAnimation } from 'src/app/shared/animations';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  animations: [
    appearAnimation
  ]
})
export class ProductComponent {

  @Input() product: Product;

  public selectionVisibility: boolean;
  public weightKind = true;
  public resultProductSelection: number;

  constructor(
    private subjectService: SubjectService
  ) {}

  public trimProductName(): string {
    if (this.product.productName.length > 20) {
      return `${this.product.productName.substring(0, 20)}...`;
    }

    return this.product.productName;
  }

  public selectProduct(): void {
    this.selectionVisibility = true;
  }

  public catchClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onClickedOutside(): void {
    this.selectionVisibility = false;
  }

  public reactOnSelectKind(value): void {
    if (value.value !== 'weight') {
      this.weightKind = false;
    } else {
      this.weightKind = true;
    }
  }

  public acceptProduct(): void {
    this.selectionVisibility = false;
    this.subjectService.emitSubject(APP.subjects.newProduct, {
      weight: this.weightKind,
      howMuch: this.resultProductSelection,
      product: this.product
    });
  }

}
