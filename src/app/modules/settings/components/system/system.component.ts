import { Component } from '@angular/core';

import { Hour } from 'src/app/shared/models/hour';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-system',
  templateUrl: 'system.component.html',
  styleUrls: ['system.component.css']
})
export class SystemComponent {

  public hours: Hour[] = APP.hours;

  public reactOnSelectHour(hour: Hour): void {
    console.log(hour);
  }

}
