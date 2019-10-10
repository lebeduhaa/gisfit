import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { ExpandComponent } from './expand.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ExpandComponent
  ],
  exports: [
    ExpandComponent
  ]
})
export class ExpandModule {}
