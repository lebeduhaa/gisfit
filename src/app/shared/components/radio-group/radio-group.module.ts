import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { RadioGroupComponent } from './radio-group.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    RadioGroupComponent
  ],
  exports: [
    RadioGroupComponent
  ]
})
export class RadioGroupModule {}
