import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP } from 'src/app/shared/constants';
import { MobileSelection } from 'src/app/shared/models/mobile-selection.model';

@Component({
  selector: 'app-mobile-select',
  templateUrl: 'mobile-select.component.html',
  styleUrls: ['mobile-select.component.css']
})
export class MobileSelectComponent {

  public resultProductSelection: number;
  public weightKind = true;

  constructor(
    private dialog: MatDialog
  ) {}

  public close(mobileSelection?: MobileSelection): void {
    this.dialog.getDialogById(APP.dialogs.mobileSelect).close(mobileSelection);
  }

  public reactOnSelectKind(value): void {
    if (value.value !== 'weight') {
      this.weightKind = false;
    } else {
      this.weightKind = true;
    }
  }

  public accept(): void {
    this.close({
      resultProductSelection: this.resultProductSelection,
      weightKind: this.weightKind
    });
  }

}
