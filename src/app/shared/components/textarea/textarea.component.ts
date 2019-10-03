import { Component, Input, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css']
})
export class TextareaComponent {

  @Input() placeholder: string;

  @ContentChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

  public placeholderAtTop: boolean;

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

}
