import { Component, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-mobile-footer',
  templateUrl: 'mobile-footer.component.html',
  styleUrls: ['mobile-footer.component.css']
})
export class MobileFooterComponent implements OnInit, OnDestroy {

  @Output() selectProductCategory = new EventEmitter<string[]>();
  @Output() selectDishCategory = new EventEmitter<string[]>();

  public currentEatingItemsNumber = 0;

  private currentEatingSubscription: Subscription;
  private subEatingSubscription: Subscription;

  constructor(
    private subjectService: SubjectService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToCurrentEating();
    this.subscribeToSubEating();
  }

  public reactOnSelectProductCategoryEvent(categories: string[]): void {
    this.selectProductCategory.emit(categories);
  }

  public reactOnSelectDishCategoryEvent(categories: string[]): void {
    this.selectDishCategory.emit(categories);
  }

  private subscribeToCurrentEating(): void {
    this.currentEatingSubscription = this.subjectService.getSubject(APP.subjects.mobileEating)
      .subscribe((newProduct: CurrentEat) => {
        setTimeout(() => {
          this.currentEatingItemsNumber += (newProduct.weight ? 1 : Number(newProduct.howMuch));
          this.changeDetectionRef.markForCheck();
        }, 700);
      });
  }

  private subscribeToSubEating(): void {
    this.subEatingSubscription = this.subjectService.getSubject(APP.subjects.subCurrentProducts)
      .subscribe(value => {
        this.currentEatingItemsNumber -= value;
        this.changeDetectionRef.markForCheck();
      });
  }

  ngOnDestroy() {}

}
