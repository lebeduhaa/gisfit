import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';
import { APP } from 'src/app/shared/constants';
import { MyFoodService } from '../../services/my-food.service';
import { RouterHelper } from 'src/app/shared/services/router.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { Category } from 'src/app/shared/models/category.model';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-add-product',
  templateUrl: 'add-product.component.html',
  styleUrls: ['add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public clearFilesSubject = new Subject<boolean>();
  public productPreloadedPhoto: string | ArrayBuffer;
  public categories: Category[];
  public productForm: FormGroup;
  public progressBarVisibility: boolean;
  public previousPage: string;
  public isProductPage: boolean;
  public detectChangesSubject = new Subject<void>();

  private formChangesSubscription: Subscription;
  private dialogSubscription: Subscription;
  private userSubscription: Subscription;
  private user: User;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private myFoodService: MyFoodService,
    private routerHelper: RouterHelper,
    private subjectService: SubjectService,
    private router: ActivatedRoute,
    private realTimeDataService: RealTimeDataService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.detectPreviousPage();
    this.setCategories();
    this.subscribeToUser();
    this.initForm();
    this.subscribeToFormChanges();
    this.clearSelectedProducts();
  }

  public reactOnCalculation(calculation: Calculation): void {
    this.productForm.controls.calories.reset(calculation.caloriesPer100Gram);
    this.productForm.controls.protein.reset(calculation.proteinPer100Gram);
    this.productForm.controls.fats.reset(calculation.fatsPer100Gram);
    this.productForm.controls.carbohydrates.reset(calculation.carbohydratesPer100Gram);
    this.productForm.controls.averageMassOfOnePiece.reset(calculation.totalWeight);
    this.generateIngredients(calculation);
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
      product.dish = true;
      product.user = {
        fakeAvatarUrl: this.user.fakeAvatarUrl,
        avatar: this.user.avatar,
        nickname: this.user.nickname
      };
    }

    this.myFoodService.createMyProduct(product)
      .then(createdId => {
        this.routerHelper.navigateToPageWithState(this.previousPage, {
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

  private clearSelectedProducts(): void {
    this.sharedDataService.currentEating = [];
    console.log(this.sharedDataService.currentEating);
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
      averageMassOfOnePiece: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      recipe: ['']
    };

    if (this.isProductPage) {
      delete formControls.description;
      delete formControls.recipe;
      delete formControls.ingredients;
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

  private subscribeToUser(): void {
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => this.user = user);
  }

  private setCategories(): void {
    if (this.isProductPage) {
      this.categories = APP.categories;
    } else {
      this.categories = APP.dishCategories;
    }
  }

  private subscribeToFormChanges(): void {
    this.formChangesSubscription = this.productForm.valueChanges
      .subscribe(() => this.detectChangesSubject.next());
  }

  private generateIngredients(calculation: Calculation): void {
    let resultString = '';

    this.groupIngredients(calculation.products).forEach((product, index) => {
      resultString += `${index + 1}) ${product.productName} (${product.weight} грамм) ${product.amount === 1 ? '' : `${product.amount} шт`}\n`;
    });

    this.productForm.controls.ingredients.reset(resultString);
  }

  private groupIngredients(products: Product[]): Product[] {
    const result: Product[] = [];

    products.forEach(product => {
      const index = result.findIndex(resultProduct => resultProduct.productName === product.productName);

      if (index === -1) {
        result.push({...product, amount: 1});
      } else {
        result[index].amount += 1;
      }
    });

    return result;
  }

  ngOnDestroy() {}

}
