import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: 'select-option.component.html',
  styleUrls: ['select-option.component.css']
})
export class SelectOptionComponent {

  @Output() selectedOption = new EventEmitter<any>();

  @Input() value: any;
  @Input() displayedValue: any;

  public select(): void {
    this.selectedOption.emit(this.value);
  }

}
