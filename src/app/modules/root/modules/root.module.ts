import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RootRoutingModule } from './root-routing.module';
import { AuthModule } from '../../auth/modules/auth.module';
import { SettingsModule } from '../../settings/modules/settings.module';
import { MyFoodModule } from '../../my-food/modules/my-food.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { NotificationModule } from 'src/app/shared/components/notification/notification.module';
import { MoveBackgroundDirective } from '../directives/move-background.directive';
import { DishesModule } from '../../dishes/modules/dishes.module';
import { DailyReportModule } from 'src/app/shared/components/daily-report/daily-report.module';
import { VideosModule } from '../../videos/modules/videos.module';
import { HistoryModule } from '../../history/modules/history.module';
import { ActivityModule } from '../../activity/modules/activity.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RootComponent } from '../components/root.component';

@NgModule({
  imports: [
    SharedModule,
    RootRoutingModule,
    HeaderModule,
    NotificationModule,
    AuthModule,
    SettingsModule,
    MyFoodModule,
    DishesModule,
    VideosModule,
    DailyReportModule,
    HistoryModule,
    ActivityModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  declarations: [
    RootComponent,
    MoveBackgroundDirective
  ],
  exports: [
    RootComponent
  ]
})
export class RootModule {}
