import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SubjectService } from '../../services/subject.service';
import { APP } from '../../constants';
import { Notification } from '../../models/notification.model';
import { notificationAnimation } from '../../animations';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  animations: [
    notificationAnimation
  ]
})
export class NotificationComponent extends Unsubscribe implements OnInit {

  public visibility: boolean;
  public title: string;
  public body: string;
  public error: boolean;

  private timeout;

  constructor(
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToVisibility();
  }

  private subscribeToVisibility(): void {
    this.subscribeTo = this.subjectService.getSubject(APP.subjects.notificationVisibility)
      .subscribe((notification: Notification) => {
        this.visibility = true;
        this.title = notification.title;
        this.body = notification.body;
        this.error = notification.error;
        this.changeDetectorRef.markForCheck();
        this.timeout = setTimeout(() => {
          this.visibility = false;
          this.changeDetectorRef.markForCheck();
        }, notification.duration);
      });
  }

  public close(): void {
    this.visibility = false;
    clearTimeout(this.timeout);
  }

}
