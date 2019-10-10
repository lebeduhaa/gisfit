import { Component, Input } from '@angular/core';

import { expandAnimation } from '../../animations';

@Component({
  selector: 'app-expand',
  templateUrl: 'expand.component.html',
  styleUrls: ['expand.component.css'],
  animations: [
    expandAnimation
  ]
})
export class ExpandComponent {

  @Input() caption: string;
  @Input() secondCaption: string;

  public contentVisibility: boolean;

  public toggleContentVisibility(): void {
    this.contentVisibility = !this.contentVisibility;
  }

}
