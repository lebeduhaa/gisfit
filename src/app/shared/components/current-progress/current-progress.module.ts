import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { CurrentProgressComponent } from './current-progress.component';
import { ProgressModule } from '../progress/progress.module';

@NgModule({
  imports: [
    SharedModule,
    ProgressModule
  ],
  declarations: [
    CurrentProgressComponent
  ],
  exports: [
    CurrentProgressComponent
  ]
})
export class CurrentProgressModule {}
