import { Component, AfterContentInit, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/amchartsdark';

import { HistoryService } from '../../services/history.service';
import { ScoreChartData } from 'src/app/shared/models/score-chart-data.model';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-score-statistics',
  templateUrl: 'score-statistics.component.html',
  styleUrls: ['score-statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreStatisticsComponent implements AfterContentInit, OnDestroy {

  public chartData: ScoreChartData[];

  private chart: am4charts.XYChart;

  constructor(
    private historyService: HistoryService,
    private ngZone: NgZone
  ) {}

  ngAfterContentInit() {
    setTimeout(async () => {
      await this.initChart();
    }, 200);
  }

  private async getChartData(): Promise<any> {
    this.chartData = await this.historyService.getScoreStatistics();
  }

  private async initChart(): Promise<any> {
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    await this.getChartData();
    this.chart.data = this.chartData;
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'totalScore';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = '{valueY}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    this.chart.scrollbarX = scrollbarX;

    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.xAxis = dateAxis;
    this.chart.cursor.snapToSeries = series;
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


}
