import { Component, NgZone, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/amchartsdark';

import { HistoryService } from '../../services/history.service';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { ChartData } from 'src/app/shared/models/chart-data.model';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-daily-statistics',
  templateUrl: 'daily-statistics.component.html',
  styleUrls: ['daily-statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyStatisticsComponent implements AfterViewInit, OnDestroy {

  public statisticsData: Statistics[];

  private chart: am4charts.XYChart;

  constructor(
    private ngZone: NgZone,
    private historyService: HistoryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  private async getStatisticsData(): Promise<any> {
    this.statisticsData = await this.historyService.getDailyStatistics();
  }

  async ngAfterViewInit() {
    await this.getStatisticsData();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.chart = am4core.create('chartdiv', am4charts.XYChart);
        this.chart.colors.step = 6;
        this.chart.data = this.generateChartData();

        const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.chart.yAxes.push(valueAxis);

        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.title.text = '%';
        valueAxis.title.rotation = 180;

        this.createAxisAndSeries('calories', 'Calories', valueAxis, 'circle');
        this.createAxisAndSeries('protein', 'Protein', valueAxis, 'triangle');
        this.createAxisAndSeries('fats', 'Fats', valueAxis, 'rectangle');
        this.createAxisAndSeries('carbohydrates', 'Carbohydrates', valueAxis, 'rhombus');

        this.chart.legend = new am4charts.Legend();
        this.chart.cursor = new am4charts.XYCursor();
        this.changeDetectorRef.markForCheck();
      }, 100);
    });
  }

  private generateChartData() {
    const chartData: ChartData[] = [];

    this.statisticsData.forEach(data => {
      chartData.push({
        date: new Date(data.year, data.month, data.day),
        calories: Number(((data.caloriesResult / data.caloriesGoal) * 100).toFixed(1)),
        protein: Number(((data.proteinResult / data.proteinGoal) * 100).toFixed(1)),
        fats: Number(((data.fatsResult / data.fatsGoal) * 100).toFixed(1)),
        carbohydrates: Number(((data.carbohydratesResult / data.carbohydratesGoal) * 100).toFixed(1))
      });
    });

    return chartData;
  }

  private createAxisAndSeries(field, name, valueAxis, bullet) {
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.name = name;
    series.tooltipText = '{name}: [bold]{valueY}[/] %';
    series.tensionX = 0.8;
    const interfaceColors = new am4core.InterfaceColorSet();

    const range = valueAxis.createSeriesRange(series);
    range.value = 100;
    range.endValue = 1000;
    range.contents.stroke = am4core.color('#FF0000');

    switch (bullet) {
      case 'rhombus': {
        const currentBullet = series.bullets.push(new am4charts.CircleBullet());
        currentBullet.circle.stroke = interfaceColors.getFor('background');
        currentBullet.circle.strokeWidth = 2;
        currentBullet.circle.radius = 8;
        break;
      }
      case 'triangle': {
        const currentBullet = series.bullets.push(new am4charts.Bullet());
        currentBullet.width = 12;
        currentBullet.height = 12;
        currentBullet.horizontalCenter = 'middle';
        currentBullet.verticalCenter = 'middle';

        const triangle = currentBullet.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor('background');
        triangle.strokeWidth = 2;
        triangle.direction = 'top';
        triangle.width = 12;
        triangle.height = 12;
        break;
      }
      case 'rectangle': {
        const currentBullet = series.bullets.push(new am4charts.Bullet());
        currentBullet.width = 10;
        currentBullet.height = 10;
        currentBullet.horizontalCenter = 'middle';
        currentBullet.verticalCenter = 'middle';

        const rectangle = currentBullet.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor('background');
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      }
      default: {
        const currentBullet = series.bullets.push(new am4charts.CircleBullet());
        currentBullet.circle.stroke = interfaceColors.getFor('background');
        currentBullet.circle.strokeWidth = 2;
        break;
      }
    }

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    this.chart.scrollbarX = scrollbarX;
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
