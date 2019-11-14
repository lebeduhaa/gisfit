import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { RectIconButtonComponent } from './rect-icon-button.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    RectIconButtonComponent
  ],
  exports: [
    RectIconButtonComponent
  ]
})
export class RectIconButtonModule {}
