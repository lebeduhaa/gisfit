import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    MaterialModule
  ],
  declarations: [
    MyFoodComponent,
    AddProductComponent
  ],
  exports: [
    MyFoodComponent
  ]
})
export class MyFoodModule {}
