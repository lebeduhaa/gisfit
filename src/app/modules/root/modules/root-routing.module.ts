import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from '../../auth/components/auth/auth.component';
import { SettingsComponent } from '../../settings/components/settings/settings.component';
import { MyFoodComponent } from '../../my-food/components/my-food/my-food.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
      { path: 'auth', redirectTo: '/auth/sign-in', pathMatch: 'full' },
      { path: 'settings', redirectTo: '/settings/personal', pathMatch: 'full' },
      { path: 'auth', component: AuthComponent },
      { path: 'settings', component: SettingsComponent, data: {animation: 'settings'} },
      { path: 'my-food', component: MyFoodComponent, data: {animation: 'my-food'} }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RootRoutingModule {}
