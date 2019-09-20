import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MyFoodComponent } from '../components/my-food/my-food.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule,
    RouterModule
  ],
  declarations: [
    MyFoodComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
