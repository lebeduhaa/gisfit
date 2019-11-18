import { Directive, HostListener, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { APP } from 'src/app/shared/constants';
import { MobileEatingComponent } from '../components/mobile-eating/mobile-eating.component';

@Directive({
  selector: '[appOpenMobileEating]'
})
export class OpenMobileEatingDirective {

  @Input() disabled: boolean;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openMobileEating(): void {
    if (!this.disabled) {
      this.dialog.open(MobileEatingComponent, {
        id: APP.dialogs.mobileEating
      });
    }
  }

}
