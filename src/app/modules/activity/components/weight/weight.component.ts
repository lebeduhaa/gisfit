import { Component, Input, OnDestroy, AfterContentInit, NgZone, DoCheck } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/amchartsdark';

import { ActivityChartData } from 'src/app/shared/models/activity-chart-data.model';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-weight',
  templateUrl: 'weight.component.html',
  styleUrls: ['weight.component.css']
})
export class WeightComponent implements  AfterContentInit, DoCheck, OnDestroy {

  @Input() weightChartData: ActivityChartData[];

  private chart: am4charts.XYChart;

  constructor(
    private ngZone: NgZone
  ) {}

  ngAfterContentInit() {
    setTimeout(async () => {
      await this.initChart();
    }, 200);
  }

  ngDoCheck() {
    this.initChart();
  }

  private async initChart(): Promise<any> {
    this.disposeChart();
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    this.chart.data = this.weightChartData;
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'data';
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

  private disposeChart(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnDestroy() {
    this.disposeChart();
  }

}
