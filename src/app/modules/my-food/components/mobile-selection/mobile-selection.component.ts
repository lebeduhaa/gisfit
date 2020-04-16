import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MyFoodService } from '../../services/my-food.service';
import { Product } from 'src/app/shared/models/product.model';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { APP } from 'src/app/shared/constants';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-mobile-selection',
  templateUrl: 'mobile-selection.component.html',
  styleUrls: ['mobile-selection.component.css']
})
export class MobileSelectionComponent implements OnInit {

  public displayedProducts: Product[];
  public spinnerVisibility: boolean;

  private products: Product[];

  constructor(
    private myFoodService: MyFoodService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private sharedDataService: SharedDataService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  public reactOnAcceptProductEvent(currentEating: CurrentEat): void {
    this.sharedDataService.currentEating.push(currentEating);
    this.subjectService.emitSubject(APP.subjects.newProduct, currentEating);
    this.dialog.getDialogById(APP.dialogs.mobileSelection).close();
  }

  public reactOnSearchEvent(key: string): void {
    this.displayedProducts = this.products.filter(product => product.productName.toLowerCase().includes(key.toLowerCase()));
  }

  private async getAllProducts(): Promise<void> {
    this.spinnerVisibility = true;
    this.products = await this.myFoodService.getAllProducts();
    this.displayedProducts = this.products;
    this.spinnerVisibility = false;
    this.changeDetectorRef.markForCheck();
  }

}
