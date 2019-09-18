import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent {

  public email: string;
  public error: string;
  public spinnerSubject = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public resetPassword(): void {
    if (this.email) {
      this.spinnerSubject.next(true);
      this.authService.resetPassword(this.email)
        .then(result => {
          this.spinnerSubject.next(false);
          this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
            title: 'Password reset request',
            body: `We have sent message about password reset on the email ${this.email}. Follow it and create new password for your account.`,
            duration: 20000
          });
          this.close();
          this.changeDetectorRef.markForCheck();
        })
        .catch(error => {
          this.spinnerSubject.next(false);
          this.error = error.message;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  private close(): void {
    this.dialog.getDialogById(APP.dialogs.passwordReset).close(this.email);
  }


}
