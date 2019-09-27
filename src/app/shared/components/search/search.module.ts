import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { SearchComponent } from './search.component';
import { MaterialModule } from '../../modules/material.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    DirectivesModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {}
