import { Directive, HostListener, EventEmitter, Output, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { MobileSelectComponent } from '../components/mobile-select/mobile-select.component';
import { APP } from 'src/app/shared/constants';
import { MobileSelection } from 'src/app/shared/models/mobile-selection.model';

@AutoUnsubscribe()
@Directive({
  selector: '[appOpenMobileSelect]'
})
export class OpenMobileSelectDirective implements OnDestroy {

  @Output() mobileSelect = new EventEmitter<MobileSelection>();

  private dialogSubscription: Subscription;
  private event: MouseEvent;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click', ['$event'])
  openMobileSelect(event: MouseEvent): void {
    const dialogRef = this.dialog.open(MobileSelectComponent, {
      id: APP.dialogs.mobileSelect
    });

    this.event = event;
    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe(mobileSelection => {
        if (mobileSelection) {
          this.mobileSelect.emit({...mobileSelection, event});
        }
      });
  }

  ngOnDestroy() {}

}
