import {
  Component,
  Input,
  AfterContentInit,
  ContentChildren,
  QueryList,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

import { expandAnimation } from 'src/app/shared/animations';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { flatEquality } from 'src/app/shared/helpers';

@AutoUnsubscribe()
@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css'],
  animations: [
    expandAnimation
  ]
})
export class SelectComponent implements AfterContentInit, OnDestroy {

  @Output() change = new EventEmitter<any>();

  @Input() placeholder: string;
  @Input() icon: string;
  @Input() value: any;

  @ContentChildren(SelectOptionComponent) selectOptions: QueryList<SelectOptionComponent>;

  public placeholderAtTop: boolean;
  public optionsVisibility: boolean;
  public currentValue: any;

  private selectValueSubscriptions = new Subscription();

  ngAfterContentInit() {
    this.subscribeToSelectValue();
    this.checkCurrentValue();
  }

  public onClickedOutside(): void {
    this.optionsVisibility = false;
  }

  public toggleOptionsVisibility(): void {
    this.optionsVisibility = !this.optionsVisibility;
  }

  private subscribeToSelectValue(): void {
    this.selectOptions.forEach(selectOptionComponent => {
      this.selectValueSubscriptions.add(selectOptionComponent.selectedOption.subscribe(value => {
        if (value) {
          this.change.emit(value);
          this.currentValue = selectOptionComponent.displayedValue;
          this.optionsVisibility = false;
          this.placeholderAtTop = true;
        }
      }));
    });
  }

  private checkCurrentValue(): void {
    if (this.value) {
      this.selectOptions.forEach(selectOptionComponent => {
        if (flatEquality(selectOptionComponent.value, this.value)) {
          this.currentValue = selectOptionComponent.displayedValue;
          this.optionsVisibility = false;
          this.placeholderAtTop = true;
        }
      });
    }
  }

  ngOnDestroy() {}

}
