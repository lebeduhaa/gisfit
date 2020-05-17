import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumericControl]'
})
export class NumericControlDirective implements OnInit {

  @Input() integer: boolean;

  private allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  ngOnInit() {
    if (!this.integer) {
      this.allowedKeys.push('.');
    }
  }

  @HostListener('keydown', ['$event'])
  inputHandler(event: KeyboardEvent): void {
    const value = Number(event.key);

    if (value !== value && !this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
