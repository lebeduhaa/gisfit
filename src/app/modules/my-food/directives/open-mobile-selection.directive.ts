import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MobileSelectionComponent } from '../components/mobile-selection/mobile-selection.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenMobileSelection]'
})
export class OpenMobileSelectionDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openMobileSelection(): void {
    const dialogRef = this.dialog.open(MobileSelectionComponent, {
      id: APP.dialogs.mobileSelection
    });
  }

}
