import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner-button',
  templateUrl: 'spinner-button.component.html',
  styleUrls: ['spinner-button.component.css']
})
export class SpinnerButtonComponent implements OnInit, OnDestroy {

  @Input() spinnerStateSubject: Subject<boolean>;
  @Input() caption: string;
  @Input() disabled: boolean;
  @Input() small: boolean;

  public spinnerVisibility: boolean;

  private spinnerStateSubscription: Subscription;

  ngOnInit() {
    if (this.spinnerStateSubject) {
      this.spinnerStateSubscription = this.spinnerStateSubject
        .subscribe(spinnerVisibility => this.spinnerVisibility = spinnerVisibility);
    }
  }

  public onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

  ngOnDestroy() {
    if (this.spinnerStateSubject) {
      this.spinnerStateSubscription.unsubscribe();
    }
  }

}
