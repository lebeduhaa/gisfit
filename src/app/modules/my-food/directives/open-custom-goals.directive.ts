import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CustomGoalsComponent } from '../components/custom-goals/custom-goals.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenCustomGoals]'
})
export class OpenCustomGoalsDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openCustomGoals(): void {
    this.dialog.open(CustomGoalsComponent, {
      width: '500px',
      id: APP.dialogs.customGoals
    });
  }

}
