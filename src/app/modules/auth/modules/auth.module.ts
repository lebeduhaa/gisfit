import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthComponent } from '../components/auth/auth.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { NotificationModule } from 'src/app/shared/components/notification/notification.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { OpenResetPasswordDirective } from '../directives/open-reset-password-dialog.directive';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    InputTextModule,
    SpinnerButtonModule,
    NotificationModule,
    MaterialModule
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    OpenResetPasswordDirective
  ],
  entryComponents: [
    ResetPasswordComponent
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {}
