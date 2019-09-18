import { NgModule } from '@angular/core';

import { ClickOutsideModule } from 'ng-click-outside';

import { SelectComponent } from '../components/select/select.component';
import { SharedModule } from '../../../modules/shared.module';
import { MaterialModule } from '../../../modules/material.module';
import { SelectOptionComponent } from '../components/select-option/select-option.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ClickOutsideModule
  ],
  declarations: [
    SelectComponent,
    SelectOptionComponent
  ],
  exports: [
    SelectComponent,
    SelectOptionComponent
  ]
})
export class SelectModule {}
