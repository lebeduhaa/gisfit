import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-input-file',
  templateUrl: 'input-file.component.html',
  styleUrls: ['input-file.component.css']
})
export class InputFileComponent implements OnInit, OnDestroy {


  @Output() fileSelected = new EventEmitter<File>();

  @Input() caption: string;
  @Input() clearFilesSubject: Subject<boolean>;

  @ViewChild('file') input: ElementRef<HTMLInputElement>;

  private filesSubscription: Subscription;

  ngOnInit() {
    this.filesSubscription = this.clearFilesSubject
      .subscribe(event => this.clearFiles());
  }

  public reactOnFileSelect(event): void {
    this.fileSelected.next(event.target.files[0]);
  }

  private clearFiles(): void {
    this.input.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.filesSubscription.unsubscribe();
  }

}
