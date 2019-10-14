import { Component, Input, ContentChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css']
})
export class TextareaComponent implements AfterViewInit, OnDestroy {

  @Input() placeholder: string;

  @ContentChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

  public placeholderAtTop: boolean;

  private focusListener;

  ngAfterViewInit() {
    this.focusListener = this.textarea.nativeElement.addEventListener('focus', () => {
      this.toTop();
    });
  }

  public toTop(): void {
    this.placeholderAtTop = true;
  }

  public toBottom(): void {
    if (this.textarea.nativeElement.value) {
      this.placeholderAtTop = true;
    } else {
      this.placeholderAtTop = false;
    }
  }

  ngOnDestroy() {
    this.textarea.nativeElement.removeEventListener('focus', this.focusListener);
  }

}
