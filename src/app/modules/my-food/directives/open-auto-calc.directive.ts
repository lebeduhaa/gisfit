import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AutoCalcComponent } from '../components/auto-calc/auto-calc.component';
import { APP } from 'src/app/shared/constants';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { MobileAutoCalcComponent } from '../components/mobile-auto-calc/mobile-auto-calc.component';

@Directive({
  selector: '[appOpenAutoCalc]'
})
export class OpenAutoCalcDirective {

  @Output() calculation = new EventEmitter<Calculation>();

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openAutoCalc(): void {
    const dialogRef = this.dialog.open(<any>(APP.isMobile ? MobileAutoCalcComponent : AutoCalcComponent), {
      width: '1300px',
      height: APP.isMobile ? '100%' : '80vh',
      id: APP.dialogs.autoCalc
    });

    dialogRef.afterClosed()
      .subscribe(calculation => {
        if (calculation) {
          this.calculation.emit(calculation);
        }
      });
  }

}
