import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ScoreStatisticsComponent } from '../components/score-statistics/score-statistics.component';

@Directive({
  selector: '[appOpenScoreStatistics]'
})
export class OpenScoreStatisticsDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openScoreStatistics(): void {
    this.dialog.open(ScoreStatisticsComponent, {
      width: '1200px'
    });
  }

}
