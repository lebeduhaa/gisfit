import { NgModule } from '@angular/core';

import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedModule } from '../../modules/shared.module';
import { CropperComponent } from './cropper.component';
import { MaterialModule } from '../../modules/material.module';
import { CustomButtonModule } from '../custom-button/custom-button.module';
import { UserIconModule } from '../user-icon/user-icon.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    CustomButtonModule,
    ImageCropperModule,
    UserIconModule
  ],
  declarations: [
    CropperComponent
  ],
  entryComponents: [
    CropperComponent
  ],
  exports: [
    CropperComponent
  ]
})
export class CropperModule {}
