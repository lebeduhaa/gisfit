import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appOpenChangePassword]'
})
export class OpenChangePasswordDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openChangePasswordDialog(): void {
    this.dialog.open(ChangePass)
  }

}
