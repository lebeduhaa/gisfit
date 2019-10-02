import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { APP } from '../../constants';

@Component({
  selector: 'app-daily-report',
  templateUrl: 'daily-report.component.html',
  styleUrls: ['daily-report.component.css']
})
export class DailyReportComponent {

  public title: string;
  public body: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog
  ) {
    this.title = dialogData.title;
    this.body = dialogData.body.split('\n');
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.dailyReport).close();
  }

}
