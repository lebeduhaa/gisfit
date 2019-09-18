import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  exports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule
  ]
})
export class MaterialModule {}
