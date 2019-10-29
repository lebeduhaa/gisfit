import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from './header.component';
import { OpenActivityDirective } from './open-activity.directive';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
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
