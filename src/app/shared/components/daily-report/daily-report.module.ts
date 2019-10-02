import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { DailyReportComponent } from './daily-report.component';
import { MaterialModule } from '../../modules/material.module';
import { SpinnerButtonModule } from '../spinner-button/spinner-button.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    SpinnerButtonModule
  ],
  declarations: [
    DailyReportComponent
  ],
  entryComponents: [
    DailyReportComponent
  ],
  exports: [
    DailyReportComponent
  ]
})
export class DailyReportModule {}
