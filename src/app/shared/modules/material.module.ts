import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSliderModule,
    MatRippleModule
  ],
  exports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSliderModule,
    MatRippleModule
  ]
})
export class MaterialModule {}
