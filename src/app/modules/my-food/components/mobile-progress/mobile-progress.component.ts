import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-mobile-progress',
  templateUrl: 'mobile-progress.component.html',
  styleUrls: ['mobile-progress.component.css']
})
export class MobileProgressComponent {

  constructor(
    private dialog: MatDialog
  ) {}

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.mobileProgress).close();
  }

}
