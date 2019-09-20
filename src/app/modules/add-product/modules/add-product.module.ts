import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AddProductComponent } from '../components/add-product/add-product.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AddProductComponent
  ],
  exports: [
    AddProductComponent
  ]
})
export class AddProductModule {}
