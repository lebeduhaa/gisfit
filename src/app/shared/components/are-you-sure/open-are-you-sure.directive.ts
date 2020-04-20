import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AreYouSureComponent } from './are-you-sure.component';
import { APP } from '../../constants';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Directive({
  selector: '[appOpenAreYouSure]'
})
export class OpenAreYouSureDirective extends Unsubscribe {

  @Output() confirmationEvent = new EventEmitter<boolean>();

  @Input() caption: string;

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  @HostListener('click')
  openAreYouSure(): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      data: {
        title: this.caption
      },
      id: APP.dialogs.areYouSure
    });

    this.subscribeTo = dialogRef.afterClosed()
      .subscribe(result => this.confirmationEvent.emit(result));
  }

}
