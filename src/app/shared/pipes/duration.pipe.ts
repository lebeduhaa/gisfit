import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    const momentDuration = moment.duration(duration * 1000);
    const hours = momentDuration.hours();
    const minutes = momentDuration.minutes();
    const seconds = momentDuration.seconds();

    if (hours) {
      return `${hours}:${minutes}:${this.getSeconds(seconds)}`;
    } else
    if (minutes) {
      return `${minutes}:${this.getSeconds(seconds)}`;
    } else {
      return `${this.getSeconds(seconds)}`;
    }
  }

  private getSeconds(seconds: number): string {
    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return `${seconds}`;
    }
  }

}
