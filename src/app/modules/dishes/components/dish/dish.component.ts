import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-dish',
  templateUrl: 'dish.component.html',
  styleUrls: ['dish.component.css']
})
export class DishComponent implements OnInit {

  @Output() setLikeEvent = new EventEmitter<string>();
  @Output() unsetLikeEvent = new EventEmitter<string>();

  @Input() dish: Product;

  private userId: string;

  constructor(
    private localStorageHelper: LocalStorageHelper
  ) {}

  ngOnInit() {
    this.getUserId();
  }

  public likeAlreadySet(): boolean {
    return this.dish.likes.includes(this.userId);
  }

  public setLike(): void {
    if (!this.likeAlreadySet()) {
      this.setLikeEvent.emit(this.dish.id);
    } else {
      this.unsetLikeEvent.emit(this.dish.id);
    }
  }

  private getUserId(): void {
    this.userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
  }

}
