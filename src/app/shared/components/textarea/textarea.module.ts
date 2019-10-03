import { NgModule } from '@angular/core';

import { ClickOutsideModule } from 'ng-click-outside';

import { SharedModule } from '../../modules/shared.module';
import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [
    SharedModule,
    ClickOutsideModule
  ],
  declarations: [
    TextareaComponent
  ],
  exports: [
    TextareaComponent
  ]
})
export class TextareaModule {}
