import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SettingsService } from '../../services/settings.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validation';
import { parseError } from 'src/app/shared/helpers';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent extends Unsubscribe implements OnInit {

  public changePasswordForm: FormGroup;
  public error: string;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.initChangePasswordForm();
    this.subscribeToFormState();
  }

  public changePassword(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);
    this.settingsService.updateUserPassword(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.password)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Change password',
          body: `Your password was changed successfully. Since this moment you will use new password to sign in into application`,
          duration: 15000
        });
        this.close();
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.error = error.message;
      });
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.changePassword).close();
  }

  public changePasswordFormHasError(): boolean {
    let valid = true;
    const controls = this.changePasswordForm.controls;

    Object.keys(controls).forEach(controlName => {
      if (controls[controlName].touched && controls[controlName].invalid) {
        valid = false;
        this.error = parseError(controls[controlName].errors, controlName);
      }
    });

    return !valid;
  }

  public controlHasError(controlName: string): boolean {
    return this.changePasswordForm.controls[controlName].touched && this.changePasswordForm.controls[controlName].invalid;
  }

  private initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [
        Validators.minLength(6),
        Validators.required
      ]],
      password: ['', [
        Validators.minLength(6),
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.minLength(6),
        Validators.required
      ]],
    }, {
      validators: [
        confirmPasswordValidator
      ]
    });
  }

  private subscribeToFormState(): void {
    this.subscribeTo = this.changePasswordForm.statusChanges
      .subscribe(status => {
        if (!this.changePasswordFormHasError()) {
          this.error = '';
        }
      });
  }

}
