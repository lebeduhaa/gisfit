import {
  Component,
  Input,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { expandAnimation } from 'src/app/shared/animations';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { flatEquality } from 'src/app/shared/helpers';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css'],
  animations: [
    expandAnimation
  ]
})
export class SelectComponent extends Unsubscribe implements AfterContentInit {

  @Output() change = new EventEmitter<any>();

  @Input() placeholder: string;
  @Input() icon: string;
  @Input() value: any;

  @ContentChildren(SelectOptionComponent) selectOptions: QueryList<SelectOptionComponent>;

  public placeholderAtTop: boolean;
  public optionsVisibility: boolean;
  public currentValue: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

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
      this.subscribeTo = selectOptionComponent.selectedOption.subscribe(value => {
        if (value) {
          this.change.emit(value);
          this.currentValue = selectOptionComponent.displayedValue;
          this.optionsVisibility = false;
          this.placeholderAtTop = true;
        }
      });
    });
  }

  private checkCurrentValue(): void {
    if (this.value) {
      this.selectOptions.forEach(selectOptionComponent => {
        if (flatEquality(selectOptionComponent.value, this.value)) {
          setTimeout(() => {
            this.currentValue = selectOptionComponent.displayedValue;
            this.optionsVisibility = false;
            this.placeholderAtTop = true;
            this.changeDetectorRef.markForCheck();
          });
        }
      });
    }
  }

  public trimCurrentValue(): string {
    if (this.currentValue && this.currentValue.length > 29) {
      return `${this.currentValue.substr(0, 29)}...`;
    }

    return this.currentValue;
  }

}
