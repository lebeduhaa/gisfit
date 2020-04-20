import { Component, Input, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-spinner-button',
  templateUrl: 'spinner-button.component.html',
  styleUrls: ['spinner-button.component.css']
})
export class SpinnerButtonComponent extends Unsubscribe implements OnInit {

  @Input() spinnerStateSubject: Subject<boolean>;
  @Input() caption: string;
  @Input() disabled: boolean;
  @Input() small: boolean;

  public spinnerVisibility: boolean;

  ngOnInit() {
    if (this.spinnerStateSubject) {
      this.subscribeTo = this.spinnerStateSubject
        .subscribe(spinnerVisibility => this.spinnerVisibility = spinnerVisibility);
    }
  }

  public onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

}
