import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MobileProgressComponent } from '../components/mobile-progress/mobile-progress.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenMobileProgress]'
})
export class OpenMobileProgressDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openMobileProgress(): void {
    this.dialog.open(MobileProgressComponent, {
      width: '100vw',
      id: APP.dialogs.mobileProgress
    });
  }

}

