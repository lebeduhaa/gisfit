import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResizableInput]'
})
export class ResizableInputDirective {

  constructor(
    private elementRef: ElementRef
  ) {}

  @HostListener('input')
  reactOnChange(): void {
    this.resize();
  }

  @HostListener('keyup')
  reactOnKeyUp(): void {
    this.resize();
  }

  @HostListener('keydown')
  reactOnKeyDown(): void {
    this.resize();
  }

  @HostListener('focus')
  reactOnFocus(): void {
    this.resize();
  }

  @HostListener('blur')
  reactOnBlur(): void {
    this.resize();
  }

  private resize(): void {
    const element = this.elementRef.nativeElement;

    element.style.width = ((element.value.length + 1) * 8) + 'px';
  }

}
