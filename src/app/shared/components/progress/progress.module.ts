import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [
    ProgressComponent
  ]
})
export class ProgressModule {}
