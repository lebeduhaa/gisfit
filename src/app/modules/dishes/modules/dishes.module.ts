import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DishesComponent } from '../components/dishes/dishes.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { DishComponent } from '../components/dish/dish.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { UserIconModule } from 'src/app/shared/components/user-icon/user-icon.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { OpenDishDirective } from '../directives/open-dish.directive';
import { ScrollToBottomDirective } from '../directives/scroll-to-bottom.directive';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    ClickOutsideModule,
    SpinnerButtonModule,
    UserIconModule
  ],
  declarations: [
    DishesComponent,
    DishComponent,
    OpenDishDirective,
    ScrollToBottomDirective
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule {}
