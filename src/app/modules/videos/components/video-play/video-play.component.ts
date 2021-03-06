import { Component, Inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { Video } from 'src/app/shared/models/video.model';
import { APP } from 'src/app/shared/constants';
import { VideosService } from '../../services/videos.service';
import { User } from 'src/app/shared/models/user.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-video-play',
  templateUrl: 'video-play.component.html',
  styleUrls: ['video-play.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayComponent extends Unsubscribe implements OnInit {

  public video: Video;
  public currentComment: string;
  public contentVisibility: boolean;
  public playNow = true;
  public currentTimelineWidth = 0;
  public videoElement: HTMLVideoElement;
  public isMobile = APP.isMobile;
  public controlsAreHidden: boolean;

  private user: User;
  private tempVolume: number;
  private timeout;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialog,
    private videosService: VideosService,
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
    this.video = dialogData.video;
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
    this.setTempVolume();

    if (this.isMobile) {
      this.hideMobileControls();
    }
  }

  public setPosition(event: MouseEvent): void {
    const progressWrapper = document.querySelector('.play__vide-timeline-wrapper') as HTMLElement;

    this.videoElement.currentTime = (event.offsetX / progressWrapper.offsetWidth) * this.videoElement.duration;
  }

  public skipNext(): void {
    this.videoElement.currentTime += 5;
  }

  public skipPrev(): void {
    this.videoElement.currentTime -= 5;
  }

  public reactOnVideoTimeUpdate(): void {
    this.currentTimelineWidth = (this.videoElement.currentTime / this.videoElement.duration) * 100;
  }

  public reactOnChangeVolume(event): void {
    this.tempVolume = event.value;
    this.videoElement.volume = this.tempVolume / 100;
  }

  public volumeIsUp(): boolean {
    if (this.videoElement) {
      return !!this.videoElement.volume;
    }

    return true;
  }

  public openFullScreen(): void {
    this.videoElement.requestFullscreen();
  }

  public playOrPause(): void {
    this.controlsAreHidden = false;

    if (this.playNow) {
      this.videoElement.pause();
    } else {
      this.videoElement.play();
    }

    this.playNow = !this.playNow;
    this.hideMobileControls();
  }

  public toggleVolume(): void {
    if (this.videoElement.volume) {
      this.videoElement.volume = 0;
    } else {
      this.videoElement.volume = this.tempVolume / 100;
    }
  }

  public getCommentDate(timestamp: number): string {
    return moment(timestamp).fromNow();
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
    return this.video.likes.includes(this.user.id);
  }

  public dislikeSet(): boolean {
    return this.video.dislikes.includes(this.user.id);
  }

  public sendComment(): void {
    this.videosService.sendComment({
      body: this.currentComment,
      nickname: this.user.nickname,
      timestamp: new Date().valueOf(),
      userAvatar: this.user.avatar,
      userFakeAvatar: this.user.fakeAvatarUrl
    }, this.video.id);
    this.currentComment = '';
  }

  public subscribeToCurrentUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.contentVisibility = true;
        this.getVideoElement();
        this.changeDetectorRef.markForCheck();
      });
  }

  private hideMobileControls(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.controlsAreHidden = true;
      this.changeDetectorRef.markForCheck();
    }, 3000);
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

  private getVideoElement(): void {
    setTimeout(() => {
      this.videoElement = document.querySelector('.play video');
    }, 0);
  }

  private setTempVolume(): void {
    this.tempVolume = 100;
  }

}
