import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { SubjectService } from '../../services/subject.service';
import { APP } from '../../constants';

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

  constructor(
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.filesSubscription = this.clearFilesSubject
      .subscribe(event => this.clearFiles());
  }

  public reactOnFileSelect(event): void {
    const kB = event.target.files[0].size / 1024;

    if (kB > 5000) {
      this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
        title: 'Image upload ERROR',
        body: 'Image size should be less than 5mb!',
        duration: 10000,
        error: true
      });
    } else {
      this.fileSelected.next(event);
    }
  }

  private clearFiles(): void {
    this.input.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.filesSubscription.unsubscribe();
  }

}
