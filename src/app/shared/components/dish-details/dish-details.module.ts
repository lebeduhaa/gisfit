import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { ExpandModule } from '../expand/expand.module';
import { MaterialModule } from '../../modules/material.module';
import { DishDetailsComponent } from './dish-details.component';
import { OpenDishDirective } from './open-dish.directive';

@NgModule({
  imports: [
    SharedModule,
    ExpandModule,
    MaterialModule
  ],
  declarations: [
    DishDetailsComponent,
    OpenDishDirective
  ],
  entryComponents: [
    DishDetailsComponent
  ],
  exports: [
    OpenDishDirective
  ]
})
export class DishDetailsModule {}
