import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SettingsService } from '../../services/settings.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validation';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { parseError } from 'src/app/shared/helpers';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@AutoUnsubscribe()
@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public changePasswordForm: FormGroup;
  public error: string;
  public spinnerSubject = new Subject<boolean>();

  private formSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initChangePasswordForm();
    this.subscribeToFormState();
  }

  public changePassword(): void {
    this.spinnerSubject.next(true);
    this.settingsService.updateUserPassword(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.password)
      .then(() => {
        this.spinnerSubject.next(false);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Change password',
          body: `Your password was changed successfully. Since this moment you will use new password to sign in into application`,
          duration: 15000
        });
        this.dialog.getDialogById(APP.dialogs.changePassword).close();
      })
      .catch(error => {
        this.spinnerSubject.next(false);
        this.error = error.message;
      });
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
    this.changePasswordForm.statusChanges
      .subscribe(status => {
        if (!this.changePasswordFormHasError()) {
          this.error = '';
        }
      });
  }

  ngOnDestroy() {}

}
