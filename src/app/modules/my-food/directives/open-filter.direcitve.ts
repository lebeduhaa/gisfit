import { Directive, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { FilterComponent } from '../components/filter/filter.component';
import { APP } from 'src/app/shared/constants';

@AutoUnsubscribe()
@Directive({
  selector: '[appOpenFilter]'
})
export class OpenFilterDirective implements OnDestroy {

  @Output() selectProductCategory = new EventEmitter<string[]>();
  @Output() selectDishCategory = new EventEmitter<string[]>();

  private productSubscription: Subscription;
  private dishSubscription: Subscription;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openFilter(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      id: APP.dialogs.filter
    });

    this.productSubscription = dialogRef.componentInstance.selectProductCategory
      .subscribe(categories => this.selectProductCategory.emit(categories));
    this.productSubscription = dialogRef.componentInstance.selectDishCategory
      .subscribe(categories => this.selectDishCategory.emit(categories));
  }

  ngOnDestroy() {}

}
