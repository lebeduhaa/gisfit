import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { HistoryComponent } from '../components/history/history.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    HistoryComponent,
    CalendarComponent
  ],
  exports: [
    HistoryComponent
  ]
})
export class HistoryModule {}
