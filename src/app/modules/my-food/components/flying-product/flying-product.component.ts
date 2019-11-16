import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { FlyingProduct } from 'src/app/shared/models/flying-product.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-flying-product',
  templateUrl: 'flying-product.component.html',
  styleUrls: ['flying-product.component.css']
})
export class FlyingProductComponent implements OnInit, OnDestroy {

  @Input() selection: boolean;

  public startX: number;
  public startY: number;
  public finishX: number;
  public finishY: number;
  public flyingProductVisibility: boolean;
  public image: string | ArrayBuffer;
  public productName: string;
  public isMobile = APP.isMobile;
  public resize: boolean;

  private subjectSubscription: Subscription;

  constructor(
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToSubject();
    this.getFinishCoordinates();
  }

  private subscribeToSubject(): void {
    this.subjectSubscription = this.subjectService.getSubject(APP.subjects.flyingProduct)
      .subscribe((flyingProduct: FlyingProduct) => {
        this.flyingProductVisibility = true;
        this.startX = flyingProduct.startX;
        this.startY = flyingProduct.startY;
        this.image = flyingProduct.image;
        this.productName = flyingProduct.productName;
        this.changeDetectorRef.markForCheck();

        setTimeout(() => {
          this.startX = this.finishX;
          this.startY = this.finishY;
          this.resize = this.isMobile;
          this.changeDetectorRef.markForCheck();
        }, 0);
        setTimeout(() => {
          this.flyingProductVisibility = false;
          this.resize = false;
          this.changeDetectorRef.markForCheck();
        }, 700);
      });
  }

  private getFinishCoordinates(): void {
    if (this.isMobile) {
      setTimeout(() => {
        const element = document.querySelector('.mobile-footer__item');

        if (element) {
          const finishCoordinates = element.getBoundingClientRect();

          this.finishX = finishCoordinates.left - 35;
          this.finishY = finishCoordinates.top - 55;
        }
      }, 0);
    } else {
      const element = document.querySelector('.current-eating');

      if (element) {
        const finishCoordinates = element.getBoundingClientRect();

        this.finishX = finishCoordinates.left + 70;
        this.finishY = finishCoordinates.top + (this.selection ? 0 : 150);
      }
    }
  }

  ngOnDestroy() {}

}
