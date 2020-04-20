import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { APP } from 'src/app/shared/constants';
import { parseError, userIsWithNecessaryData } from 'src/app/shared/helpers';
import { AuthService } from '../../services/auth.service';
import { RouterHelper } from 'src/app/shared/services/router.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-sing-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})
export class SignInComponent extends Unsubscribe implements OnInit {

  public spinnerStateSubject = new Subject<boolean>();
  public signInForm: FormGroup;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private routerHelper: RouterHelper
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
    this.authService.signIn(this.signInForm.value)
      .then(user => {
        if (userIsWithNecessaryData(user)) {
          this.routerHelper.navigateToPage(APP.pages.myFood);
        } else {
          this.routerHelper.navigateToPage(APP.pages.settings);
        }

        this.spinnerStateSubject.next(false);
      })
      .catch(error => {
        this.error = error.message || error;
        this.spinnerStateSubject.next(false);
        this.changeDetectorRef.markForCheck();
      });
  }

  public signInFormHasError(): boolean {
    let valid = true;
    const controls = this.signInForm.controls;

    Object.keys(controls).forEach(controlName => {
      if (controls[controlName].touched && controls[controlName].invalid) {
        valid = false;
        this.error = parseError(controls[controlName].errors, controlName);
      }
    });

    return !valid;
  }

  public controlHasError(controlName: string): boolean {
    return this.signInForm.controls[controlName].touched && this.signInForm.controls[controlName].invalid;
  }

  private initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  private subscribeFormState(): void {
    this.subscribeTo = this.signInForm.statusChanges
      .subscribe(status => {
        if (!this.signInFormHasError()) {
          this.error = '';
        }
      });
  }

}
