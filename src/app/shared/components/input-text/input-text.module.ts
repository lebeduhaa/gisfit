import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { InputTextComponent } from './input-text.component';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    InputTextComponent
  ],
  exports: [
    InputTextComponent

  ]
})
export class InputTextModule {

}
