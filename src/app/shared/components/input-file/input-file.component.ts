import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';

import { SubjectService } from '../../services/subject.service';
import { APP } from '../../constants';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-input-file',
  templateUrl: 'input-file.component.html',
  styleUrls: ['input-file.component.css']
})
export class InputFileComponent extends Unsubscribe implements OnInit {


  @Output() fileSelected = new EventEmitter<File>();

  @Input() caption: string;
  @Input() clearFilesSubject: Subject<boolean>;
  @Input() video: boolean;

  @ViewChild('file', { static: true }) input: ElementRef<HTMLInputElement>;

  constructor(
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  public reactOnFileSelect(event): void {
    const kB = event.target.files[0].size / 1024;

    if (kB > 5000 && !this.video) {
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

  private initSubscriptions(): void {
    if (this.clearFilesSubject) {
      this.subscribeTo = this.clearFilesSubject
        .subscribe(event => this.clearFiles());
    }
  }

}
