import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { VideosComponent } from '../components/videos/videos.component';
import { UploaderComponent } from '../components/uploader/uploader.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { TextareaModule } from 'src/app/shared/components/textarea/textarea.module';
import { InputFileModule } from 'src/app/shared/components/input-file/input-file.module';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule,
    InputTextModule,
    TextareaModule,
    InputFileModule
  ],
  declarations: [
    VideosComponent,
    UploaderComponent
  ],
  exports: [
    VideosComponent
  ]
})
export class VideosModule {}
