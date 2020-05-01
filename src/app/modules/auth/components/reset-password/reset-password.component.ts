import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { APP } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth.service';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  public email: string;
  public error: string;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public resetPassword(): void {
    if (this.email) {
      this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
      this.authService.resetPassword(this.email)
        .then(result => {
          this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
          this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
            title: 'Password reset request',
            body: `We have sent message about password reset on the email ${this.email}. Follow it and create new password for your account.`,
            duration: 20000
          });
          this.close();
          this.changeDetectorRef.markForCheck();
        })
        .catch(error => {
          this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
          this.error = error.message;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.passwordReset).close(this.email);
  }


}
