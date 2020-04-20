import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MobileSelectComponent } from '../components/mobile-select/mobile-select.component';
import { APP } from 'src/app/shared/constants';
import { MobileSelection } from 'src/app/shared/models/mobile-selection.model';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Directive({
  selector: '[appOpenMobileSelect]'
})
export class OpenMobileSelectDirective extends Unsubscribe {

  @Output() mobileSelect = new EventEmitter<MobileSelection>();

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  @HostListener('click', ['$event'])
  openMobileSelect(event: MouseEvent): void {
    const dialogRef = this.dialog.open(MobileSelectComponent, {
      id: APP.dialogs.mobileSelect
    });

    this.subscribeTo = dialogRef.afterClosed()
      .subscribe(mobileSelection => {
        if (mobileSelection) {
          this.mobileSelect.emit({...mobileSelection, event});
        }
      });
  }

}
