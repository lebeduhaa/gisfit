import { NgModule } from '@angular/core';

import { NumericControlDirective } from './numeric-control.directive';
import { ResizableInputDirective } from './resizable-input.directive';

@NgModule({
  declarations: [
    NumericControlDirective,
    ResizableInputDirective
  ],
  exports: [
    NumericControlDirective,
    ResizableInputDirective
  ]
})
export class DirectivesModule {}
