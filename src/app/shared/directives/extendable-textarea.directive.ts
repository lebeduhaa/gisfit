import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appExtendableTextarea]'
})
export class ExtendableTextareaDirective {

  @HostListener('input', ['$event'])
  reactOnInput(event): void {
    if (event.target.tagName.toLowerCase() !== 'textarea') {
      return;
    }

    this.autoExpand(event.target);
  }

  private autoExpand(field) {
    field.style.height = 'inherit';

    const computed = window.getComputedStyle(field);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + field.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';
  }

}
