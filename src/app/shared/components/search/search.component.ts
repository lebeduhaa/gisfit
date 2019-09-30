import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent {

  @Output() searchEvent = new EventEmitter<string>();

  @Input() caption: string;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  public visibility: boolean;
  public currentValue: string;

  public open(): void {
    this.visibility = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  public reactOnBlur(event): void {
    if (!this.currentValue) {
      this.close(event);
    }
  }

  public close(event: MouseEvent): void {
    event.stopPropagation();
    this.visibility = false;
    this.currentValue = '';
    this.reactOnInput();
  }

  public reactOnInput(): void {
    this.searchEvent.emit(this.currentValue);
  }

}
