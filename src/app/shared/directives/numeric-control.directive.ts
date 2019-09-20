import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericControl]'
})
export class NumericControlDirective {

  private allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', '.'];

  @HostListener('keydown', ['$event'])
  inputHandler(event: KeyboardEvent): void {
    const value = Number(event.key);

    if (value !== value && !this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
