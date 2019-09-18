import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-radio-group',
  templateUrl: 'radio-group.component.html',
  styleUrls: ['radio-group.component.css']
})
export class RadioGroupComponent {

  @Output() select = new EventEmitter<string>();

  @Input() options: string[];
  @Input() twoWayBind: User;

  public reactOnSelect(event): void {
    this.select.emit(event.value);
  }

}
