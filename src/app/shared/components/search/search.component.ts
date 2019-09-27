import { Component, Input, Output, EventEmitter } from '@angular/core';

import { appearAnimation } from '../../animations';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  animations: [
    appearAnimation
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
