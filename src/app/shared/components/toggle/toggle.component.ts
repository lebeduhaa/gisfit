import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['toggle.component.css']
})
export class ToggleComponent implements OnInit {

  @Output() change = new EventEmitter<boolean>();

  @Input() title: string;
  @Input() value: boolean;

  public on: boolean;

  ngOnInit() {
    this.on = this.value;
  }

  public toggle() {
    this.on = !this.on;
    this.change.emit(this.on);
  }

}
