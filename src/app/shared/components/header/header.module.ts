import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
