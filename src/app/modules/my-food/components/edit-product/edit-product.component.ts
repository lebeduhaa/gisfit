import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { Product } from 'src/app/shared/models/product.model';
import { MyFoodService } from '../../services/my-food.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-product',
  templateUrl: 'edit-product.component.html',
  styleUrls: ['edit-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductComponent implements OnInit {

  public product: Product;
  public productEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private formBuilder: FormBuilder,
    private myFoodService: MyFoodService,
    private subjectService: SubjectService,
    private dialog: MatDialog
  ) {
    this.product = dialogData.product;
  }

  ngOnInit() {
    this.initProductEditForm();
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.editProduct).close();
  }

  public editButtonIsDisabled(): boolean {
    return this.productEditForm.invalid || this.productEditForm.controls.productName.value === this.product.productName;
  }

  public edit(): void {
    this.subjectService.emitSubject(APP.subjects.spinnerVisibility, true);

    this.myFoodService.editProduct(this.product.id, this.productEditForm.value)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Edit product',
          body: 'Product was edited successfully',
          duration: 5000
        });
        this.close();
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.spinnerVisibility, false);
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Edit product ERROR',
          body: error,
          error: true,
          duration: 10000
        });
        this.close();
      });
  }

  private initProductEditForm(): void {
    this.productEditForm = this.formBuilder.group({
      productName: [this.product.productName, Validators.required]
    });
  }

}
