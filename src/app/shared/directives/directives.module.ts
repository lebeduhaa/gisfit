import { NgModule } from '@angular/core';

import { NumericControlDirective } from './numeric-control.directive';

@NgModule({
  declarations: [
    NumericControlDirective
  ],
  exports: [
    NumericControlDirective
  ]
})
export class DirectivesModule {}
