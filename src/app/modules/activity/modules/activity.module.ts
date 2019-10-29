import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ActivityComponent } from '../components/activity/activity.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ActivityComponent,
  ],
  exports: [
    ActivityComponent
  ]
})
export class ActivityModule {}
