import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from './header.component';
import { OpenActivityDirective } from './open-activity.directive';
import { UserIconModule } from '../user-icon/user-icon.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    UserIconModule
  ],
  declarations: [
    HeaderComponent,
    OpenActivityDirective
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
