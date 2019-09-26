import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { SpinnerButtonModule } from '../spinner-button/spinner-button.module';
import { SearchComponent } from './search.component';
import { InputTextModule } from '../input-text/input-text.module';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule,
    InputTextModule,
    ClickOutsideModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {}
