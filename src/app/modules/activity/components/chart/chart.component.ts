import { Component, Input, OnDestroy, AfterContentInit, NgZone, DoCheck, ChangeDetectorRef } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/amchartsdark';
import { Subject, Subscription } from 'rxjs';

import { ActivityChartData } from 'src/app/shared/models/activity-chart-data.model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@AutoUnsubscribe()
@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements  AfterContentInit, OnDestroy {

  @Input() caption: string;
  @Input() axisTitle: string;
  @Input() chartId: string;
  @Input() renderSubject: Subject<ActivityChartData[]>;

  private chart: am4charts.XYChart;
  private renderSubscription: Subscription;

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    this.subscribeToRender();
  }

  private async initChart(chartData: ActivityChartData[]): Promise<any> {
    this.disposeChart();
    this.chart = am4core.create(this.chartId, am4charts.XYChart);
    this.chart.data = chartData;
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = this.axisTitle;
    valueAxis.title.rotation = 0;

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

  private subscribeToRender(): void {
    this.renderSubscription = this.renderSubject
      .subscribe(chartData => {
        this.initChart(chartData);
        this.changeDetectorRef.markForCheck();
      });
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
