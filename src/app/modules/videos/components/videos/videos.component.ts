import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { VideosService } from '../../services/videos.service';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'app-videos',
  templateUrl: 'videos.component.html',
  styleUrls: ['videos.component.css']
})
export class VideosComponent extends FirebaseCloudMessaging implements OnInit, OnDestroy {

  public videos: Video[];
  public displayedVideos: Video[];
  public progressBarVisibility: boolean;

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog,
    private videosService: VideosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.getVideos();
  }

  private getVideos(): void {
    this.progressBarVisibility = true;

    this.videosService.getVideos()
      .then(videos => {
        this.videos = videos;
        this.displayedVideos = videos;
        this.progressBarVisibility = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {}

}
