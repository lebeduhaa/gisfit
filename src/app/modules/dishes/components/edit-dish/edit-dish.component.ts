import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as lodash from 'lodash';

import { Product } from 'src/app/shared/models/product.model';
import { flatEquality } from 'src/app/shared/helpers';
import { MyFoodService } from 'src/app/modules/my-food/services/my-food.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-dish',
  templateUrl: 'edit-dish.component.html',
  styleUrls: ['edit-dish.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDishComponent implements OnInit {

  public dish: Product;
  public editDishForm: FormGroup;
  public spinnerStateSubject = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private formBuilder: FormBuilder,
    private myFoodService: MyFoodService,
    private subjectService: SubjectService,
    private dialog: MatDialog
  ) {
    this.dish = dialogData.dish;
  }

  ngOnInit() {
    this.initEditDishForm();
    this.dishHasChanges();
  }

  public close(): void {
    this.dialog.getDialogById(APP.dialogs.editDish).close();
  }

  public edit(): void {
    this.spinnerStateSubject.next(true);

    this.myFoodService.editProduct(this.dish.id, this.editDishForm.value)
      .then(() => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Edit dish',
          body: 'Your dish was edit successfully!',
          duration: 5000
        });
        this.close();
      })
      .catch(error => {
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Edit dish ERROR',
          body: error,
          error: true,
          duration: 10000
        });
        this.close();
      });
  }

  public disabledEditButton(): boolean {
    return this.editDishForm.invalid || !this.dishHasChanges();
  }

  private dishHasChanges(): boolean {
    return !lodash.isEqualWith(this.dish, this.editDishForm.value, (value: Product, other: Product) => {
      if (
        value.productName === other.productName &&
        value.description === other.description &&
        value.ingredients === other.ingredients &&
        value.recipe === other.recipe
      ) {
        return true;
      }
    });
  }

  private initEditDishForm(): void {
    this.editDishForm = this.formBuilder.group({
      productName: [this.dish.productName, Validators.required],
      description: [this.dish.description, Validators.required],
      ingredients: [this.dish.ingredients, Validators.required],
      recipe: [this.dish.recipe]
    });
  }
}
