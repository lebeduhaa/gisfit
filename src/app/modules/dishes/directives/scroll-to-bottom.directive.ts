import { Directive, HostListener, ElementRef } from '@angular/core';
import { getClosestByClassName } from 'src/app/shared/helpers';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective {

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('click')
  scrollToBottom(): void {
    const scrolledComponent = getClosestByClassName(this.elementRef.nativeElement, 'flip-card-inner').querySelector('.dish__comments-chat');

    scrolledComponent.scrollTo({top: scrolledComponent.scrollHeight});
  }

}
