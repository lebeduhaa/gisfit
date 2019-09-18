import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AuthComponent } from '../components/auth/auth.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'sign-in', component: SignInComponent, data: {animation: 'sign-in'} },
          { path: 'sign-up', component: SignUpComponent, data: {animation: 'sign-up'} }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
