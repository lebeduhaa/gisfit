import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appOpenDish]'
})
export class OpenDishDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openDialog(): void {
    // this.dialog.open()
  }

}
