import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MyFoodComponent } from '../components/my-food/my-food.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MyFoodComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
