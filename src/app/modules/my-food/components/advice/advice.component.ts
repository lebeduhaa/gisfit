import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-advice',
  templateUrl: 'advice.component.html',
  styleUrls: ['advice.component.css']
})
export class AdviceComponent implements OnInit {

  public advices = APP.advice;
  public currentAdvice: string;

  private currentIndex = 0;
  private interval;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setCurrentAdvice();
    this.updateTimer();
  }

  public nextAdvice(): void {
    if (this.currentIndex === this.advices.length - 1) {
      this.currentIndex = 0;
      this.setCurrentAdvice();
    } else {
      this.currentIndex++;
      this.setCurrentAdvice();
    }

    this.updateTimer();
  }

  public prevAdvice(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.advices.length - 1;
      this.setCurrentAdvice();
    } else {
      this.currentIndex--;
      this.setCurrentAdvice();
    }

    this.updateTimer();
  }

  private setCurrentAdvice(): void {
    this.currentAdvice = this.advices[this.currentIndex];
  }

  private updateTimer(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.nextAdvice();
      this.changeDetectorRef.markForCheck();
    }, 60000);
  }

}
