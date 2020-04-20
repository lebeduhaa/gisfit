import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FilterComponent } from '../components/filter/filter.component';
import { APP } from 'src/app/shared/constants';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Directive({
  selector: '[appOpenFilter]'
})
export class OpenFilterDirective extends Unsubscribe {

  @Output() selectProductCategory = new EventEmitter<string[]>();
  @Output() selectDishCategory = new EventEmitter<string[]>();

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  @HostListener('click')
  openFilter(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      id: APP.dialogs.filter
    });

    this.subscribeTo = dialogRef.componentInstance.selectProductCategory
      .subscribe(categories => this.selectProductCategory.emit(categories));
    this.subscribeTo = dialogRef.componentInstance.selectDishCategory
      .subscribe(categories => this.selectDishCategory.emit(categories));
  }

}
