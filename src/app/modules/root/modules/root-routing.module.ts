import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from '../../auth/components/auth/auth.component';
import { SettingsComponent } from '../../settings/components/settings/settings.component';
import { MyFoodComponent } from '../../my-food/components/my-food/my-food.component';
import { AddProductComponent } from '../../my-food/components/add-product/add-product.component';
import { DishesComponent } from '../../dishes/components/dishes/dishes.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { VideosComponent } from '../../videos/components/videos/videos.component';
import { UploaderComponent } from '../../videos/components/uploader/uploader.component';
import { HistoryComponent } from '../../history/components/history/history.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
      { path: 'auth', redirectTo: '/auth/sign-in', pathMatch: 'full' },
      { path: 'settings', redirectTo: '/settings/personal', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'auth', component: AuthComponent },
      { path: 'settings', component: SettingsComponent, data: {animation: 'settings'}, canActivate: [AuthGuard] },
      { path: 'my-food', component: MyFoodComponent, data: {animation: 'my-food'}, canActivate: [AuthGuard] },
      { path: 'add-product', component: AddProductComponent, data: {animation: 'add-product'}, canActivate: [AuthGuard] },
      { path: 'dishes', component: DishesComponent, data: {animation: 'dishes'}, canActivate: [AuthGuard] },
      { path: 'videos', component: VideosComponent, data: {animation: 'videos'}, canActivate: [AuthGuard] },
      { path: 'add-video', component: UploaderComponent, data: {animation: 'add-video'}, canActivate: [AuthGuard] },
      { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RootRoutingModule {}
