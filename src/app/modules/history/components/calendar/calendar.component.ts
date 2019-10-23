import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() select = new EventEmitter<Date>();

  public months = APP.months;
  public daysOfWeek = APP.daysOfWeek;
  public days: number[];
  public viewedYear: number;
  public viewedMonth: number;
  public viewedDay: number;
  public currentYear: number;
  public currentMonth: number;
  public currentDay: number;
  public nowDay: number;
  public nowMonth: number;
  public nowYear: number;
  public skippedDays: any[];

  ngOnInit() {
    this.initViewed();
    this.initNow();
    this.initCurrentDate();
  }

  public futureMonth(month: number): boolean {
    if (this.viewedYear === this.nowYear && month > this.nowMonth) {
      return true;
    }

    return false;
  }

  public futureDay(day: number): boolean {
    if (
      this.viewedYear === this.nowYear &&
      this.viewedMonth === this.nowMonth &&
      day > this.nowDay
    ) {
      return true;
    }

    return false;
  }

  public isCurrent(day: number): boolean {
    return this.currentYear === this.viewedYear &&
           this.currentMonth === this.viewedMonth &&
           this.currentDay === day;
  }

  public setDay(day: number): void {
    this.currentDay = day;
    this.currentMonth = this.viewedMonth;
    this.currentYear = this.viewedYear;
    this.select.emit(new Date(this.currentYear, this.currentMonth, this.currentDay));
  }

  public setMonth(month: number): void {
    this.viewedMonth = month;

    this.updateUI();
  }

  public prevYear(): void {
    this.viewedYear = this.viewedYear - 1;

    this.updateUI();
  }

  public nextYear(): void {
    this.viewedYear = this.viewedYear + 1;

    this.updateUI();
  }

  public isToday(day: number): boolean {
    return this.viewedYear === this.nowYear && this.viewedMonth === this.nowMonth && day === this.nowDay;
  }

  private initNow(): void {
    this.nowYear = this.viewedYear;
    this.nowMonth = this.viewedMonth;
    this.nowDay = this.viewedDay;
  }

  private initCurrentDate(): void {
    this.currentYear = this.viewedYear;
    this.currentMonth = this.viewedMonth;
    this.currentDay = this.viewedDay;
    this.select.emit(new Date(this.currentYear, this.currentMonth, this.currentDay));
  }

  private initViewed(): void {
    const currentDate = moment(new Date());

    this.viewedYear = currentDate.year();
    this.viewedMonth = currentDate.month();
    this.viewedDay = currentDate.date();
    this.days = Array.from(Array(currentDate.daysInMonth()).keys()).map(key => ++key);
    this.skippedDays = Array.from(Array(currentDate.subtract(currentDate.date(), 'day').day() + 1).keys());
  }

  private updateUI(): void {
    const viewedDate = moment(new Date(this.viewedYear, this.viewedMonth, this.viewedDay));

    this.viewedYear = viewedDate.year();
    this.viewedMonth = viewedDate.month();
    this.viewedDay = viewedDate.date();
    this.days = Array.from(Array(viewedDate.daysInMonth()).keys()).map(key => ++key);
    this.skippedDays = Array.from(Array(moment(new Date(this.viewedYear, this.viewedMonth)).day()).keys());
  }

}
