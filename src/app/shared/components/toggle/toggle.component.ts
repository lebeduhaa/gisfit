import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['toggle.component.css']
})
export class ToggleComponent {

  @Output() change = new EventEmitter<boolean>();

  @Input() title: string;

  public on: boolean;

  public toggle() {
    this.on = !this.on;
  }

}
