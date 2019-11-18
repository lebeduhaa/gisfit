import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-mobile-eating',
  templateUrl: 'mobile-eating.component.html',
  styleUrls: ['mobile-eating.component.css']
})
export class MobileEatingComponent implements OnInit, OnDestroy {

  public closePopupSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subscribeToClosePopup();
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.mobileEating).close();
  }

  private subscribeToClosePopup(): void {
    this.closePopupSubscription = this.subjectService.getSubject(APP.subjects.closeMobileEatings)
      .subscribe(() => this.close());
  }

  ngOnDestroy() {}

}
