import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DishesComponent } from '../components/dishes/dishes.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { DishComponent } from '../components/dish/dish.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    SpinnerButtonModule
  ],
  declarations: [
    DishesComponent,
    DishComponent
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule {}
