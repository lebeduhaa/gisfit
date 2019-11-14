import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect-icon-button',
  templateUrl: 'rect-icon-button.component.html',
  styleUrls: ['rect-icon-button.component.css']
})
export class RectIconButtonComponent {

  @Input() icon: string;
  @Input() url: string;

}
