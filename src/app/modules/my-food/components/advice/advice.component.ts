import { Component, OnInit } from '@angular/core';

import { APP } from 'src/app/shared/constants';
import { Advice } from 'src/app/shared/models/advice.model';

@Component({
  selector: 'app-advice',
  templateUrl: 'advice.component.html',
  styleUrls: ['advice.component.css']
})
export class AdviceComponent implements OnInit {

  public advices = APP.advice;
  public currentAdvice: Advice;

  private currentIndex = 0;

  ngOnInit() {
    this.setCurrentAdvice();
  }


  public nextAdvice(): void {
    if (this.currentIndex === this.advices.length - 1) {
      this.currentIndex = 0;
      this.setCurrentAdvice();
    } else {
      this.currentIndex++;
      this.setCurrentAdvice();
    }
  }

  public prevAdvice(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.advices.length - 1;
      this.setCurrentAdvice();
    } else {
      this.currentIndex--;
      this.setCurrentAdvice();
    }
  }

  private setCurrentAdvice(): void {
    this.currentAdvice = this.advices[this.currentIndex];
  }

}
