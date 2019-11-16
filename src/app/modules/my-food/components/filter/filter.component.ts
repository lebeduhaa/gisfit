import { Component, Output, EventEmitter } from '@angular/core';

import { APP } from 'src/app/shared/constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent {

  @Output() selectProductCategory = new EventEmitter<string[]>();
  @Output() selectDishCategory = new EventEmitter<string[]>();

  public productCategories = APP.categories;
  public dishCategories = APP.dishCategories;

  constructor(
    private dialog: MatDialog
  ) {}

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.filter).close();
  }

  public reactOnSelectProductCategoryEvent(categories: string[]): void {
    this.selectProductCategory.emit(categories);
  }

  public reactOnSelectDishCategoryEvent(categories: string[]): void {
    this.selectDishCategory.emit(categories);
  }

}
