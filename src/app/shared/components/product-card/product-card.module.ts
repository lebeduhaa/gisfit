import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { ProductCardComponent } from './product-card.component';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ProductCardComponent
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule {}
