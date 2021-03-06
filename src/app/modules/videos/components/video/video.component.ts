import { Component, Input } from '@angular/core';

import { Video } from 'src/app/shared/models/video.model';
import { VideosService } from '../../services/videos.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-video',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent {

  @Input() video: Video;

  private isMobile = APP.isMobile;

  constructor(
    private videosService: VideosService
  ) {}

  public openVideo(): void {
    Promise.resolve(this.videosService.incViews(this.video.id));
  }

  public reactOnMouseEnter(event): void {
    if (!this.isMobile) {
      event.target.querySelector('video').play();
    }
  }

  public reactOnMouseLeave(event): void {
    if (!this.isMobile) {
      event.target.querySelector('video').pause();
    }
  }

  public getTrimTitle(): string {
    return this.video.title.length > 60 ? `${this.video.title.substring(0, 60)}...` : this.video.title;
  }

}
