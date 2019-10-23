import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { HistoryComponent } from '../components/history/history.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { CurrentProgressModule } from 'src/app/shared/components/current-progress/current-progress.module';
import { HistoryFoodComponent } from '../components/history-food/history-food.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { OpenHistoryFoodDirective } from '../directives/open-history-food.directive';
import { OpenDailyStatisticsDirective } from '../directives/open-daily-statistics.directive';
import { DailyStatisticsComponent } from '../components/daily-statistics/daily-statistics.component';
import { ScoreStatisticsComponent } from '../components/score-statistics/score-statistics.component';
import { OpenScoreStatisticsDirective } from '../directives/open-score-statistics.directive';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProductCardModule,
    CurrentProgressModule,
    SpinnerButtonModule,
    ProductCardModule
  ],
  declarations: [
    HistoryComponent,
    CalendarComponent,
    HistoryFoodComponent,
    DailyStatisticsComponent,
    ScoreStatisticsComponent,
    OpenHistoryFoodDirective,
    OpenDailyStatisticsDirective,
    OpenScoreStatisticsDirective
  ],
  entryComponents: [
    HistoryFoodComponent,
    DailyStatisticsComponent,
    ScoreStatisticsComponent
  ],
  exports: [
    HistoryComponent
  ]
})
export class HistoryModule {}
