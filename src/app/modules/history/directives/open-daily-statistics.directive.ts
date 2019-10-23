import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DailyStatisticsComponent } from '../components/daily-statistics/daily-statistics.component';


@Directive({
  selector: '[appOpenDailyStatistics]'
})
export class OpenDailyStatisticsDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openDailyStatistics(): void {
    this.dialog.open(DailyStatisticsComponent, {
      width: '1200px'
    });
  }

}
