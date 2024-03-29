import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.css']
})
export class ProgressComponent {

  @Input() value: number;
  @Input() preview: number;
  @Input() color: string;
  @Input() pending: boolean;

}
