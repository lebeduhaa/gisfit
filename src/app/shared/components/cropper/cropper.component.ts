import { Component, Inject } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { APP } from '../../constants';

@Component({
  selector: 'app-cropper',
  templateUrl: 'cropper.component.html',
  styleUrls: ['cropper.component.css']
})
export class CropperComponent {

  public imageChangedEvent: any = '';
  public croppedImage: string;
  public spinnerVisibility: boolean;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) {
    this.imageChangedEvent = dialogData.event;
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.cropper).close();
  }

  public accept(): void {
    this.dialog.getDialogById(APP.dialogs.cropper).close(this.croppedImage);
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.spinnerVisibility = false;
  }

  public reactOnStartCropImage(): void {
    this.spinnerVisibility = true;
  }
}
