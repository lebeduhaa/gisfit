import { Component, Input, Output, EventEmitter } from '@angular/core';

import { widthAnimation } from '../../animations';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  animations: [
    widthAnimation
  ]
})
export class SearchComponent {

  @Output() searchEvent = new EventEmitter<string>();

  @Input() caption: string;

  public visibility: boolean;
  public currentValue: string;

  public open(): void {
    this.visibility = true;
  }

  public close(event: MouseEvent): void {
    event.stopPropagation();
    this.visibility = false;
    this.currentValue = '';
    this.reactOnInput();
  }

  public reactOnInput(): void {
    this.searchEvent.emit(this.currentValue);
  }

}
