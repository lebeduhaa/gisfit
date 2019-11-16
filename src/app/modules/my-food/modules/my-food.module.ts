import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideModule } from 'ng-click-outside';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

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
import { AutoCalcComponent } from '../components/auto-calc/auto-calc.component';
import { OpenAutoCalcDirective } from '../directives/open-auto-calc.directive';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { OpenEditProductDirective } from '../directives/open-edit-product.directive';
import { DishDetailsModule } from 'src/app/shared/components/dish-details/dish-details.module';
import { ProductInfoModule } from 'src/app/shared/components/product-info/product-info.module';
import { SearchOutsideComponent } from '../components/search-outside/search-outside.component';
import { SearchOutsideDirective } from '../directives/search-outside.directive';
import { MobileFooterComponent } from '../components/mobile-footer/mobile-footer.component';
import { OpenMobileProgressDirective } from '../directives/open-mobile-progress.directive';
import { MobileProgressComponent } from '../components/mobile-progress/mobile-progress.component';
import { FilterComponent } from '../components/filter/filter.component';
import { OpenFilterDirective } from '../directives/open-filter.direcitve';
import { FoodOptionsComponent } from '../components/food-options/food-options.component';
import { MobileOptionsComponent } from '../components/mobile-options/mobile-options.component';
import { OpenMobileFoodOptionsDirective } from '../directives/open-food-options.directive';
import { MobileEatingComponent } from '../components/mobile-eating/mobile-eating.component';
import { OpenMobileEatingDirective } from '../directives/open-mobile-eating.directive';

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
    CurrentProgressModule,
    DishDetailsModule,
    ProductInfoModule,
    VirtualScrollerModule
  ],
  declarations: [
    MyFoodComponent,
    AddProductComponent,
    ProductComponent,
    CurrentEatingComponent,
    FlyingProductComponent,
    CustomGoalsComponent,
    CategoriesComponent,
    AdviceComponent,
    AutoCalcComponent,
    EditProductComponent,
    SearchOutsideComponent,
    MobileFooterComponent,
    MobileProgressComponent,
    FilterComponent,
    FoodOptionsComponent,
    MobileOptionsComponent,
    MobileEatingComponent,
    OpenCustomGoalsDirective,
    OpenAutoCalcDirective,
    OpenEditProductDirective,
    SearchOutsideDirective,
    OpenMobileProgressDirective,
    OpenFilterDirective,
    OpenMobileFoodOptionsDirective,
    OpenMobileEatingDirective
  ],
  entryComponents: [
    CustomGoalsComponent,
    AutoCalcComponent,
    EditProductComponent,
    SearchOutsideComponent,
    FilterComponent,
    MobileOptionsComponent,
    MobileProgressComponent,
    MobileEatingComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
