import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { APP } from 'src/app/shared/constants';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-mobile-eating',
  templateUrl: 'mobile-eating.component.html',
  styleUrls: ['mobile-eating.component.css']
})
export class MobileEatingComponent extends Unsubscribe implements OnInit {

  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToClosePopup();
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.mobileEating).close();
  }

  private subscribeToClosePopup(): void {
    this.subscribeTo = this.subjectService.getSubject(APP.subjects.closeMobileEatings)
      .subscribe(() => this.close());
  }

}
