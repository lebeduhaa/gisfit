import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TextareaComponent
  ],
  exports: [
    TextareaComponent
  ]
})
export class TextareaModule {}
