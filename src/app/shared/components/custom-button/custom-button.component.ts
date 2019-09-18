import { Component, Input } from '@angular/core';
import { APP } from '../../constants';

@Component({
  selector: 'app-custom-button',
  templateUrl: 'custom-button.component.html',
  styleUrls: ['custom-button.component.css']
})
export class CustomButtonComponent {

  @Input() caption: string;
  @Input() disabled: boolean;
  @Input() color: string;

  public onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

}
