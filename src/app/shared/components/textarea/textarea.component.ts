import { Component, Input, ContentChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css']
})
export class TextareaComponent extends Unsubscribe implements AfterViewInit {

  @Input() placeholder: string;
  @Input() detectChanges: Subject<void>;

  @ContentChild('textarea', /* TODO: add static flag */ {}) textarea: ElementRef<HTMLTextAreaElement>;

  public placeholderAtTop: boolean;

  private focusListener;

  ngAfterViewInit() {
    this.subscribeToChanges();
    this.focusListener = this.textarea.nativeElement.addEventListener('focus', () => {
      this.toTop();
    });
    this.toBottom();
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

  private subscribeToChanges(): void {
    if (this.detectChanges) {
      this.subscribeTo = this.detectChanges
        .subscribe(() => this.toTop());
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.textarea.nativeElement.removeEventListener('focus', this.focusListener);
  }

}
