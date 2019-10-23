import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AutoCalcComponent } from '../components/auto-calc/auto-calc.component';

@Directive({
  selector: '[appOpenAutoCalc]'
})
export class OpenAutoCalcDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openAutoCalc(): void {
    this.dialog.open(AutoCalcComponent, {
      width: '1200px'
    });
  }

}
