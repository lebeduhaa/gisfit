import { NgModule } from '@angular/core';

import { NumericControlDirective } from './numeric-control.directive';
import { ResizableInputDirective } from './resizable-input.directive';
import { ExtendableTextareaDirective } from './extendable-textarea.directive';

@NgModule({
  declarations: [
    NumericControlDirective,
    ResizableInputDirective,
    ExtendableTextareaDirective
  ],
  exports: [
    NumericControlDirective,
    ResizableInputDirective,
    ExtendableTextareaDirective
  ]
})
export class DirectivesModule {}
