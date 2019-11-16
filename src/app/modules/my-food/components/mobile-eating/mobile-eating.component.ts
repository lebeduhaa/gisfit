import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mobile-eating',
  templateUrl: 'mobile-eating.component.html',
  styleUrls: ['mobile-eating.component.css']
})
export class MobileEatingComponent {

  constructor(
    private dialog: MatDialog
  ) {}

}
