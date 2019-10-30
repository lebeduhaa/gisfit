import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ActivityComponent } from '../components/activity/activity.component';
import { WeightComponent } from '../components/weight/weight.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ActivityComponent,
    WeightComponent
  ],
  exports: [
    ActivityComponent
  ]
})
export class ActivityModule {}
