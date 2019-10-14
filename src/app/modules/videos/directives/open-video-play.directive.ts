import { Directive, Input, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Video } from 'src/app/shared/models/video.model';
import { VideoPlayComponent } from '../components/video-play/video-play.component';
import { APP } from 'src/app/shared/constants';

@Directive({
  selector: '[appOpenVideoPlay]'
})
export class OpenVideoPlayDirective {

  @Input() video: Video;

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  openDialog(): void {
    this.dialog.open(VideoPlayComponent, {
      width: '100%',
      height: '100%',
      data: {
        video: this.video
      },
      id: APP.dialogs.videoPlay
    });
  }

}
