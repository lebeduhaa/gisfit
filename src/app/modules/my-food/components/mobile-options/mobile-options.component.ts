import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-mobile-options',
  templateUrl: 'mobile-options.component.html',
  styleUrls: ['mobile-options.component.css']
})
export class MobileOptionsComponent {

  constructor(
    private dialog: MatDialog
  ) {}

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.mobileFoodOptions).close();
  }

}
