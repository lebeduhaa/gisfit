import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenResetPassword]'
})
export class OpenResetPasswordDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openResetPasswordDirective(): void {
    this.dialog.open(ResetPasswordComponent, {
      width: '450px',
      id: APP.dialogs.passwordReset
    });
  }

}
