import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { AreYouSureComponent } from './are-you-sure.component';
import { OpenAreYouSureDirective } from './open-are-you-sure.directive';
import { CustomButtonModule } from '../custom-button/custom-button.module';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    CustomButtonModule
  ],
  declarations: [
    AreYouSureComponent,
    OpenAreYouSureDirective
  ],
  entryComponents: [
    AreYouSureComponent
  ],
  exports: [
    OpenAreYouSureDirective
  ]
})
export class AreYouSureModule {}
