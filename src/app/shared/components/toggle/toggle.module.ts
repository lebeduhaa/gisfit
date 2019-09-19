import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ToggleComponent
  ],
  exports: [
    ToggleComponent
  ]
})
export class ToggleModule {}
