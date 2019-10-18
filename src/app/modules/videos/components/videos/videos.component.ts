import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import * as recursiveDiff from 'recursive-diff';

import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { VideosService } from '../../services/videos.service';
import { Video } from 'src/app/shared/models/video.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { APP } from 'src/app/shared/constants';


@AutoUnsubscribe()
@Component({
  selector: 'app-videos',
  templateUrl: 'videos.component.html',
  styleUrls: ['videos.component.css']
})
export class VideosComponent extends FirebaseCloudMessaging implements OnInit, OnDestroy {

  public videos: Video[];
  public displayedVideos: Video[];
  public progressBarVisibility: boolean;

  private realTimeDataSubscription: Subscription;

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog,
    private videosService: VideosService,
    private changeDetectorRef: ChangeDetectorRef,
    private realTimeDataService: RealTimeDataService
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.getVideos();
    this.subscribeToRealTimeData();
  }

  public reactOnSearchEvent(key: string): void {
    if (key) {
      this.displayedVideos = this.videos.filter(video => video.title.toLowerCase().includes(key.toLowerCase()));
    } else {
      this.displayedVideos = this.videos;
    }
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

  private subscribeToRealTimeData(): void {
    this.realTimeDataSubscription = this.realTimeDataService.subscribeToVideos()
      .subscribe(changes => {
        switch (changes[0].type) {
          case APP.dataActions.modified: {
            const videoData = changes[0].payload.doc.data() as Video;
            const videoMainIndex = this.videos.findIndex(video => video.id === videoData.id);
            const videoDisplayedIndex = this.displayedVideos.findIndex(video => video.id === videoData.id);
            const delta = recursiveDiff.getDiff(this.videos[videoMainIndex], videoData);

            recursiveDiff.applyDiff(this.videos[videoMainIndex], delta);
            recursiveDiff.applyDiff(this.displayedVideos[videoDisplayedIndex], delta);
            this.changeDetectorRef.markForCheck();
          }
        }
      });
  }

  ngOnDestroy() {}

}
