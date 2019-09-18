import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { CustomButtonComponent } from './custom-button.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CustomButtonComponent
  ],
  exports: [
    CustomButtonComponent
  ]
})
export class CustomButtonModule {}
