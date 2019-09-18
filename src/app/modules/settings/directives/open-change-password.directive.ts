import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenChangePassword]'
})
export class OpenChangePasswordDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '450px',
      id: APP.dialogs.changePassword
    });
  }

}
