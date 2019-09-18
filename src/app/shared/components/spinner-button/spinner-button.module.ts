import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { SpinnerButtonComponent } from './spinner-button.component';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    SpinnerButtonComponent
  ],
  exports: [
    SpinnerButtonComponent
  ]
})
export class SpinnerButtonModule {}
