import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {}
