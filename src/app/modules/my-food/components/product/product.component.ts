import { Component, Input, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { appearAnimation } from 'src/app/shared/animations';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { MobileSelection } from 'src/app/shared/models/mobile-selection.model';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  animations: [
    appearAnimation
  ]
})
export class ProductComponent implements OnInit {

  @Output() deleteProductEvent = new EventEmitter<string>();
  @Output() addProductEvent = new EventEmitter<string>();
  @Output() acceptProductEvent = new EventEmitter<CurrentEat>();

  @Input() product: Product;
  @Input() my: boolean;
  @Input() selection: boolean;

  public selectionVisibility: boolean;
  public weightKind = true;
  public resultProductSelection: number;
  public userId: string;
  public isMobile = APP.isMobile;
  public mobileActionsVisibility: boolean;

  constructor(
    private subjectService: SubjectService,
    private localStorageHelper: LocalStorageHelper,
    private sharedDataService: SharedDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getUserId();
  }

  public closeMobileActions(): void {
    if (this.isMobile && this.mobileActionsVisibility) {
      this.mobileActionsVisibility = false;
    }
  }

  public openMobileActions(): void {
    setTimeout(() => {
      if (this.isMobile) {
        this.mobileActionsVisibility = true;
        this.changeDetectorRef.markForCheck();
      }
    }, 0);
  }

  public reactOnMobileSelect(mobileSelection: MobileSelection): void {
    this.weightKind = mobileSelection.weightKind;
    this.resultProductSelection = mobileSelection.resultProductSelection;
    this.acceptProduct(mobileSelection.event);
  }

  public reactOnConfirmAddProduct(confirmation: boolean): void {
    if (confirmation) {
      this.addProductEvent.emit(this.product.id);
    }
  }

  public reactOnConfirmDeleteProduct(confirmation: boolean): void {
    if (confirmation) {
      this.deleteProductEvent.emit(this.product.id);
    }
  }

  public trimProductName(): string {
    if (this.product.productName.length > 19) {
      return `${this.product.productName.substring(0, 19)}...`;
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
    const newProduct = {
      weight: this.weightKind,
      howMuch: this.resultProductSelection,
      product: this.product
    };
    const flyingProduct = {
      startX: buttonCoordinates.left,
      startY: buttonCoordinates.top,
      image: this.product.image,
      productName: this.trimProductName()
    };
    const preview = {
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
    };

    this.selectionVisibility = false;
    this.subjectService.emitSubject(APP.subjects.flyingProduct, flyingProduct);

    if (this.isMobile) {
      this.sharedDataService.currentEating.push(newProduct);
      this.subjectService.emitSubject(APP.subjects.mobileEating, newProduct);
      this.subjectService.emitSubject(APP.subjects.newProduct, newProduct);
      this.sharedDataService.previewData.push(preview);
      this.acceptProductEvent.emit(newProduct);
    } else {
      this.subjectService.emitSubject(APP.subjects.newProduct, newProduct);
      this.subjectService.emitSubject(APP.subjects.preview, preview);
    }

    this.resultProductSelection = null;
  }

  private getUserId(): void {
    this.userId = this.localStorageHelper.getCachedData(APP.cachedData.userData).id;
  }

}
