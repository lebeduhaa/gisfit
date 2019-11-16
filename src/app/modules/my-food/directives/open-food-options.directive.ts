import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MobileOptionsComponent } from '../components/mobile-options/mobile-options.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenFoodOptions]'
})
export class OpenMobileFoodOptionsDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openFoodOptions(): void {
    this.dialog.open(MobileOptionsComponent, {
      id: APP.dialogs.mobileFoodOptions
    });
  }

}
