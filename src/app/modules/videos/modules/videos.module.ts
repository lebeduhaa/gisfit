import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { VideosComponent } from '../components/videos/videos.component';
import { UploaderComponent } from '../components/uploader/uploader.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { TextareaModule } from 'src/app/shared/components/textarea/textarea.module';
import { InputFileModule } from 'src/app/shared/components/input-file/input-file.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomButtonModule } from 'src/app/shared/components/custom-button/custom-button.module';
import { ProgressModule } from 'src/app/shared/components/progress/progress.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { VideoComponent } from '../components/video/video.component';
import { CropperModule } from 'src/app/shared/components/cropper/cropper.module';
import { VideoPlayComponent } from '../components/video-play/video-play.component';
import { OpenVideoPlayDirective } from '../directives/open-video-play.directive';
import { UserIconModule } from 'src/app/shared/components/user-icon/user-icon.module';
import { ListenToArrowsDirective } from '../directives/listen-to-arrows.directive';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule,
    InputTextModule,
    TextareaModule,
    InputFileModule,
    MaterialModule,
    CustomButtonModule,
    RouterModule,
    ProgressModule,
    SearchModule,
    CropperModule,
    UserIconModule
  ],
  declarations: [
    VideosComponent,
    UploaderComponent,
    VideoComponent,
    VideoPlayComponent,
    OpenVideoPlayDirective,
    ListenToArrowsDirective
  ],
  entryComponents: [
    VideoPlayComponent
  ],
  exports: [
    VideosComponent
  ]
})
export class VideosModule {}
