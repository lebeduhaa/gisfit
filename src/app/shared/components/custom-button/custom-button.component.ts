import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: 'custom-button.component.html',
  styleUrls: ['custom-button.component.css']
})
export class CustomButtonComponent {

  @Input() caption: string;
  @Input() disabled: boolean;
  @Input() color: string;
  @Input() small: boolean;

  public onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

}
