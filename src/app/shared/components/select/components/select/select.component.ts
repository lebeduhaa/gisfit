import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { expandAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css'],
  animations: [
    expandAnimation
  ]
})
export class SelectComponent {

  @Input() placeholder: string;
  @Input() icon: string;

  public placeholderAtTop: boolean;
  public optionsVisibility: boolean;
  public currentValue: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public onClickedOutside(): void {
    this.optionsVisibility = false;
  }

  public toggleOptionsVisibility(): void {
    this.optionsVisibility = !this.optionsVisibility;
  }

  public reactOnChangeCurrentValue(value: string): void {
    if (value) {
      this.currentValue = value;
      this.optionsVisibility = false;
      this.placeholderAtTop = true;
    }
  }

}
