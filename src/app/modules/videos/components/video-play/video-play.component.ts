import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { Video } from 'src/app/shared/models/video.model';
import { APP } from 'src/app/shared/constants';
import { VideosService } from '../../services/videos.service';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-video-play',
  templateUrl: 'video-play.component.html',
  styleUrls: ['video-play.component.css']
})
export class VideoPlayComponent implements OnInit {

  public video: Video;

  private userId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog,
    private videosService: VideosService,
    private localStorageHelper: LocalStorageHelper
  ) {
    this.video = dialogData.video;
  }

  ngOnInit() {
    this.getUserId();
  }

  public getFormatedDate(): string {
    return moment(this.video.timestamp).format('DD MMMM YYYY');
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.videoPlay).close();
  }

  public reactOnLikeClick(): void {
    if (this.likeSet()) {
      this.unsetLike();
    } else {
      this.setLike();
    }
  }

  public reactOnDislikeClick(): void {
    if (this.dislikeSet()) {
      this.unsetDislike();
    } else {
      this.setDislike();
    }
  }

  public likeSet(): boolean {
    return this.video.likes.includes(this.userId);
  }

  public dislikeSet(): boolean {
    return this.video.dislikes.includes(this.userId);
  }

  private setLike(): void {
    Promise.resolve(this.videosService.setLike(this.video.id));
  }

  private setDislike(): void {
    Promise.resolve(this.videosService.setDislike(this.video.id));
  }

  private unsetLike(): void {
    Promise.resolve(this.videosService.unsetLike(this.video.id));
  }

  private unsetDislike(): void {
    Promise.resolve(this.videosService.unsetDislike(this.video.id));
  }

  private getUserId(): void {
    this.userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
  }

}
