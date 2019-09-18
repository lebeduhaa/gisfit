import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSelectOption]'
})
export class SelectOptionDirective {

  @Output() currentValueEvent = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  reactOnSelect(mouseEvent: MouseEvent) {
    this.currentValueEvent.emit((mouseEvent.target as HTMLElement).textContent);
  }

}
