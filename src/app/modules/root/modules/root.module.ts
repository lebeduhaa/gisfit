import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { RootComponent } from '../component/root.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RootRoutingModule } from './root-routing.module';
import { AuthModule } from '../../auth/modules/auth.module';
import { SettingsModule } from '../../settings/modules/settings.module';
import { MyFoodModule } from '../../my-food/modules/my-food.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { NotificationModule } from 'src/app/shared/components/notification/notification.module';
import { MoveBackgroundDirective } from '../directives/move-background.directive';
import { DailyReportModule } from 'src/app/shared/components/daily-report/daily-report.module';

@NgModule({
  imports: [
    SharedModule,
    RootRoutingModule,
    HeaderModule,
    NotificationModule,
    AuthModule,
    SettingsModule,
    MyFoodModule,
    TranslateModule.forChild(),
    DailyReportModule
  ],
  declarations: [
    RootComponent,
    MoveBackgroundDirective
  ],
  exports: [
    RootComponent
  ]
})
export class RootModule {

}
