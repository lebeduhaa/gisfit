import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validation';
import { parseError } from 'src/app/shared/helpers';
import { AuthService } from '../../services/auth.service';
import { RouterHelper } from 'src/app/shared/services/router.service';
import { APP } from 'src/app/shared/constants';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-sing-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent extends Unsubscribe implements OnInit {

  public spinnerStateSubject = new Subject<boolean>();
  public signUpForm: FormGroup;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private routerHelper: RouterHelper,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.subscribeFormState();
  }

  public signIn(): void {
    this.spinnerStateSubject.next(true);
    this.error = '';
    this.authService.signUp(this.signUpForm.value)
      .then(result => {
        this.spinnerStateSubject.next(false);
        this.routerHelper.navigateToPage(APP.pages.signIn);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Successful registration',
          body: 'Now you need to verify your email address. After that you will be able to sign in.',
          duration: 15000
        });
      })
      .catch(error => {
        this.error = error.message;
        this.spinnerStateSubject.next(false);
        this.changeDetectorRef.markForCheck();
      });
  }

  public signInFormHasError(): boolean {
    let valid = true;
    const controls = this.signUpForm.controls;

    Object.keys(controls).forEach(controlName => {
      if (controls[controlName].touched && controls[controlName].invalid) {
        valid = false;
        this.error = parseError(controls[controlName].errors, controlName);
      }
    });

    return !valid;
  }

  public controlHasError(controlName: string): boolean {
    return this.signUpForm.controls[controlName].touched && this.signUpForm.controls[controlName].invalid;
  }

  private initForm() {
    this.signUpForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    }, {
      validators: [
        confirmPasswordValidator
      ]
    });
  }

  private subscribeFormState(): void {
    this.subscribeTo = this.signUpForm.statusChanges
      .subscribe(status => {
        if (!this.signInFormHasError()) {
          this.error = '';
        }
      });
  }

}

