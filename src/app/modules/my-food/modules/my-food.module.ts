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
import { CurrentProgressComponent } from '../components/current-progress/current-progress.component';
import { ProgressModule } from 'src/app/shared/components/progress/progress.module';

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
    ProgressModule
  ],
  declarations: [
    MyFoodComponent,
    AddProductComponent,
    ProductComponent,
    ProductInfoComponent,
    OpenProductInfoDirective,
    CurrentEatingComponent,
    FlyingProductComponent,
    CurrentProgressComponent
  ],
  entryComponents: [
    ProductInfoComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
