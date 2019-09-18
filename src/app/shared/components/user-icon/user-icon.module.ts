import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { UserIconComponent } from './user-icon.component';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    UserIconComponent
  ],
  exports: [
    UserIconComponent
  ]
})
export class UserIconModule {}
