import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';
import { APP } from 'src/app/shared/constants';
import { MyFoodService } from '../../services/my-food.service';
import { RouterHelper } from 'src/app/shared/services/router.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-add-product',
  templateUrl: 'add-product.component.html',
  styleUrls: ['add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public clearFilesSubject = new Subject<boolean>();
  public productPreloadedPhoto: string | ArrayBuffer;
  public categories: string[] = APP.categories;
  public productForm: FormGroup;
  public progressBarVisibility: boolean;
  public previousPage: string;
  public isProductPage: boolean;

  private dialogSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private myFoodService: MyFoodService,
    private routerHelper: RouterHelper,
    private subjectService: SubjectService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.detectPreviousPage();
    this.initForm();
  }

  public reactOnSelectProductImage(event): void {
    if (event.target.files.length) {
      this.openCropperDialog();
    }
  }

  public save(): void {
    const product = {...this.productForm.value} as Product;
    this.progressBarVisibility = true;
    this.changeDetectorRef.markForCheck();

    if (!this.isProductPage) {
      product.likes = [];
      product.comments = [];
    }

    this.myFoodService.createMyProduct(product)
      .then(createdId => {
        this.routerHelper.navigateToPageWithState(APP.pages.myFood, {
          createdId,
          image: this.productPreloadedPhoto
        });
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'Product was added successfully',
          body: 'You have added you product. Now you can use it as your food for the progress calculation.',
          duration: 15000
        });
      })
      .catch(error => {
        this.progressBarVisibility = false;
        this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
          title: 'ERROR',
          body: error.message,
          duration: 15000,
          error: true
        });
      });
  }

  public reactOnSelectCategory(category: string): void {
    this.productForm.controls.category.reset(category);
  }

  private initForm(): void {
    const formControls = {
      productName: ['', Validators.required],
      category: ['', Validators.required],
      calories: ['', Validators.required],
      protein: ['', Validators.required],
      fats: ['', Validators.required],
      carbohydrates: ['', Validators.required],
      image: ['', Validators.required],
      averageMassOfOnePiece: ['', Validators.required]
    };

    if (!this.isProductPage) {
      delete formControls.category;
    }

    this.productForm = this.formBuilder.group(formControls);
  }

  private openCropperDialog(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '700px',
      id: APP.dialogs.cropper,
      data: {
        event
      }
    });

    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe(async base64 => {
        this.clearFilesSubject.next(true);
        this.productPreloadedPhoto = base64;
        this.productForm.controls.image.reset(base64);
        this.changeDetectorRef.markForCheck();
      });
  }

  private detectPreviousPage(): void {
    this.previousPage = this.router.snapshot.queryParams.previous;

    if (this.previousPage === 'my-food') {
      this.isProductPage = true;
    }
  }

  ngOnDestroy() {}

}
