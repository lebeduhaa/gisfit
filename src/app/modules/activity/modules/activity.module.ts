import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ActivityComponent } from '../components/activity/activity.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ChartComponent } from '../components/chart/chart.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ActivityComponent,
    ChartComponent
  ],
  exports: [
    ActivityComponent
  ]
})
export class ActivityModule {}
