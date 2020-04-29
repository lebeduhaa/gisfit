import { Component } from '@angular/core';

import { fade } from 'src/app/shared/animations';


@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
  animations: [
    fade
  ]
})
export class SpinnerComponent {}
