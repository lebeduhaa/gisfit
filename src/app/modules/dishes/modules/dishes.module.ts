import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DishesComponent } from '../components/dishes/dishes.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { TextareaModule } from 'src/app/shared/components/textarea/textarea.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    SpinnerButtonModule
  ],
  declarations: [
    DishesComponent
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule {}
