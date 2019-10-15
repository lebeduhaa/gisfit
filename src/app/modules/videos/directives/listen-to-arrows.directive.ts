import { Directive, HostListener, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appListenToArrows]'
})
export class ListenToArrowsDirective implements AfterContentInit {

  public constructor(private el: ElementRef<HTMLVideoElement>) {

  }

  public ngAfterContentInit() {

      setTimeout(() => {

          this.el.nativeElement.focus();

          const event = new Event('keydown');

          this.el.nativeElement.dispatchEvent(event);

      }, 1000);

  }

  @HostListener('focusout')
  onBlur(): void {
    console.log('blur');
  }

  @HostListener('focus')
  reactOnFocus(): void {
    console.log('focus');
  }

  @HostListener('click')
  onClick(): void {
    console.log('click');
  }

  @HostListener('keydown')
  onKeyDown(): void {
    console.log('keydown');
  }

  @HostListener('document:keydown')
  onDocumentKeyPress(): void {
    console.log('press');
  }

}
