import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { ProductCardComponent } from './product-card.component';
import { MaterialModule } from '../../modules/material.module';
import { ProductInfoModule } from '../product-info/product-info.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProductInfoModule
  ],
  declarations: [
    ProductCardComponent
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule {}
