import { Component, Input } from '@angular/core';

import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'app-video',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent {

  @Input() video: Video;

}
