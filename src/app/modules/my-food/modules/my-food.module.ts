import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideModule } from 'ng-click-outside';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MyFoodComponent } from '../components/my-food/my-food.component';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { CropperModule } from 'src/app/shared/components/cropper/cropper.module';
import { SelectModule } from 'src/app/shared/components/select/modules/select.module';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { CustomButtonModule } from 'src/app/shared/components/custom-button/custom-button.module';
import { InputFileModule } from 'src/app/shared/components/input-file/input-file.module';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProductComponent } from '../components/product/product.component';
import { ProductInfoComponent } from '../components/product-info/product-info.component';
import { OpenProductInfoDirective } from '../directives/open-product-info.directive';
import { RadioGroupModule } from 'src/app/shared/components/radio-group/radio-group.module';
import { CurrentEatingComponent } from '../components/current-eating/current-eating.component';
import { FlyingProductComponent } from '../components/flying-product/flying-product.component';
import { ProgressModule } from 'src/app/shared/components/progress/progress.module';
import { AreYouSureModule } from 'src/app/shared/components/are-you-sure/are-you-sure.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CustomGoalsComponent } from '../components/custom-goals/custom-goals.component';
import { OpenCustomGoalsDirective } from '../directives/open-custom-goals.directive';
import { ToggleModule } from 'src/app/shared/components/toggle/toggle.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { CategoriesComponent } from '../components/categories/categories.component';
import { AdviceComponent } from '../components/advice/advice.component';
import { TextareaModule } from 'src/app/shared/components/textarea/textarea.module';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { CurrentProgressModule } from 'src/app/shared/components/current-progress/current-progress.module';

@NgModule({
  imports: [
    SharedModule,
    SpinnerButtonModule,
    CropperModule,
    SelectModule,
    InputTextModule,
    SpinnerButtonModule,
    CustomButtonModule,
    InputFileModule,
    RouterModule,
    MaterialModule,
    ClickOutsideModule,
    RadioGroupModule,
    ProgressModule,
    AreYouSureModule,
    DirectivesModule,
    ToggleModule,
    SearchModule,
    TextareaModule,
    ProductCardModule,
    CurrentProgressModule
  ],
  declarations: [
    MyFoodComponent,
    AddProductComponent,
    ProductComponent,
    ProductInfoComponent,
    OpenProductInfoDirective,
    CurrentEatingComponent,
    FlyingProductComponent,
    CustomGoalsComponent,
    OpenCustomGoalsDirective,
    CategoriesComponent,
    AdviceComponent
  ],
  entryComponents: [
    ProductInfoComponent,
    CustomGoalsComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
