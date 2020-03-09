import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-input-text',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.css']
})
export class InputTextComponent implements OnInit, OnDestroy {

  @Input() placeholder: string;
  @Input() icon: string;
  @Input() small: boolean;
  @Input() detectChanges: Subject<void>;

  @ViewChild('input', { static: true }) inputWrapper: ElementRef;

  public placeholderAtTop: boolean;

  private changesSubscription: Subscription;
  private input: HTMLInputElement;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getWrapperInput();
    this.registerFocusListener();
    this.registerBlurListener();
    this.checkDefaultValue();
    this.subscribeToChanges();
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

  private subscribeToChanges(): void {
    if (this.detectChanges) {
      this.changesSubscription = this.detectChanges
        .subscribe(() => this.calcCurrentPlaceholderPosition());
    }
  }

  private checkDefaultValue(): void {
    setTimeout(() => {
      if (this.input.value) {
        this.calcCurrentPlaceholderPosition();
      }
    }, 0);
  }

  ngOnDestroy() {}

}
