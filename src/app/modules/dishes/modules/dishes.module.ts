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
import { DishDetailsComponent } from '../components/dish-details/dish-details.component';
import { ExpandModule } from 'src/app/shared/components/expand/expand.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    ClickOutsideModule,
    SpinnerButtonModule,
    UserIconModule,
    ExpandModule,
    SearchModule
  ],
  declarations: [
    DishesComponent,
    DishComponent,
    OpenDishDirective,
    ScrollToBottomDirective,
    DishDetailsComponent
  ],
  entryComponents: [
    DishDetailsComponent
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule {}
