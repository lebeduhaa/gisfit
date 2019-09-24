import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { APP } from '../../constants';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: 'are-you-sure.component.html',
  styleUrls: ['are-you-sure.component.css']
})
export class AreYouSureComponent {

  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog
  ) {
    this.title = dialogData.title;
  }

  public close(value: boolean): void {
    this.dialog.getDialogById(APP.dialogs.areYouSure).close(value);
  }

}
