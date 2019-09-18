import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { SpinnerButtonModule } from '../spinner-button/spinner-button.module';
import { InputFileComponent } from './input-file.component';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule
  ],
  declarations: [
    InputFileComponent
  ],
  exports: [
    InputFileComponent
  ]
})
export class InputFileModule {}
