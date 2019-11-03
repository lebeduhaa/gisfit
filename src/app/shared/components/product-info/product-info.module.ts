import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { ProductInfoComponent } from './product-info.component';
import { OpenProductInfoDirective } from './open-product-info.directive';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ProductInfoComponent,
    OpenProductInfoDirective
  ],
  entryComponents: [
    ProductInfoComponent
  ],
  exports: [
    OpenProductInfoDirective
  ]
})
export class ProductInfoModule {}
