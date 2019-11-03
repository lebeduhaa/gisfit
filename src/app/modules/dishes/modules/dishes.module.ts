import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DishesComponent } from '../components/dishes/dishes.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { DishComponent } from '../components/dish/dish.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { UserIconModule } from 'src/app/shared/components/user-icon/user-icon.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { ScrollToBottomDirective } from '../directives/scroll-to-bottom.directive';
import { ExpandModule } from 'src/app/shared/components/expand/expand.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { EditDishComponent } from '../components/edit-dish/edit-dish.component';
import { OpenEditDishDirective } from '../directives/open-edit-dish.directive';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { TextareaModule } from 'src/app/shared/components/textarea/textarea.module';
import { DishDetailsModule } from 'src/app/shared/components/dish-details/dish-details.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    ClickOutsideModule,
    SpinnerButtonModule,
    UserIconModule,
    ExpandModule,
    SearchModule,
    InputTextModule,
    TextareaModule,
    DishDetailsModule
  ],
  declarations: [
    DishesComponent,
    DishComponent,
    EditDishComponent,
    OpenEditDishDirective,
    ScrollToBottomDirective
  ],
  entryComponents: [
    EditDishComponent
  ],
  exports: [
    DishesComponent
  ]
})
export class DishesModule {}
