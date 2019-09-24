import { Component, Input, EventEmitter, Output } from '@angular/core';

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

  @Output() deleteProductEvent = new EventEmitter<string>();

  @Input() product: Product;

  public selectionVisibility: boolean;
  public weightKind = true;
  public resultProductSelection: number;

  constructor(
    private subjectService: SubjectService
  ) {}

  public reactOnConfirmDeleteProduct(confirmation: boolean): void {
    if (confirmation) {
      this.deleteProductEvent.emit(this.product.id);
    }
  }

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

  public acceptProduct(event: MouseEvent): void {
    const button = (event.target as HTMLElement);
    const buttonCoordinates = button.getBoundingClientRect();

    this.selectionVisibility = false;
    this.subjectService.emitSubject(APP.subjects.newProduct, {
      weight: this.weightKind,
      howMuch: this.resultProductSelection,
      product: this.product
    });
    this.subjectService.emitSubject(APP.subjects.flyingProduct, {
      startX: buttonCoordinates.left,
      startY: buttonCoordinates.top,
      image: this.product.image,
      productName: this.trimProductName()
    });
    this.subjectService.emitSubject(APP.subjects.preview, {
      add: true,
      calories: this.weightKind ?
        (this.product.calories * this.resultProductSelection) / 100 :
        (this.product.calories * (this.resultProductSelection * this.product.averageMassOfOnePiece)) / 100,
      protein: this.weightKind ?
        (this.product.protein * this.resultProductSelection) / 100 :
        (this.product.protein * (this.resultProductSelection * this.product.averageMassOfOnePiece)) / 100,
      fats: this.weightKind ?
        (this.product.fats * this.resultProductSelection) / 100 :
        (this.product.fats * (this.resultProductSelection * this.product.averageMassOfOnePiece)) / 100,
      carbohydrates: this.weightKind ?
        (this.product.carbohydrates * this.resultProductSelection) / 100 :
        (this.product.carbohydrates * (this.resultProductSelection * this.product.averageMassOfOnePiece)) / 100,
    });

    this.resultProductSelection = null;
  }

}
