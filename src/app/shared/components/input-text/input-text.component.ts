import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.css']
})
export class InputTextComponent implements OnInit {

  @Input() placeholder: string;
  @Input() icon: string;
  @Input() small: boolean;

  @ViewChild('input') inputWrapper: ElementRef;

  public placeholderAtTop: boolean;

  private input: HTMLInputElement;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getWrapperInput();
    this.registerFocusListener();
    this.registerBlurListener();
    this.checkDefaultValue();
  }

  public targetFocus(): void {
    this.input.focus();
    this.placeholderAtTop = true;
  }

  private getWrapperInput(): void {
    this.input = this.inputWrapper.nativeElement.getElementsByTagName('input')[0];
  }

  private registerBlurListener(): void {
    this.input.addEventListener('blur', () => this.calcCurrentPlaceholderPosition());
  }

  private registerFocusListener(): void {
    this.input.addEventListener('focus', () => (this.placeholderAtTop = true, this.changeDetectorRef.markForCheck()));
  }

  private calcCurrentPlaceholderPosition(): void {
    this.placeholderAtTop = !!this.input.value;
    this.changeDetectorRef.markForCheck();
  }

  private checkDefaultValue(): void {
    setTimeout(() => {
      if (this.input.value) {
        this.calcCurrentPlaceholderPosition();
      }
    }, 0);
  }

}
