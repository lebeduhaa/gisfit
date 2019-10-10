import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { DishesService } from '../../services/dishes.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-dish',
  templateUrl: 'dish.component.html',
  styleUrls: ['dish.component.css']
})
export class DishComponent implements OnInit {

  @Output() setLikeEvent = new EventEmitter<string>();
  @Output() unsetLikeEvent = new EventEmitter<string>();

  @Input() dish: Product;
  @Input() user: User;

  public commentsVisibility: boolean;
  public currentComment: string;

  private userId: string;

  constructor(
    private localStorageHelper: LocalStorageHelper,
    private dishesService: DishesService
  ) {}

  ngOnInit() {
    this.getUserId();
  }

  public sendComment(): void {
    if (this.currentComment.trim()) {
      Promise.resolve(this.dishesService.sendComment({
        body: this.currentComment.trim(),
        nickname: this.user.nickname,
        timestamp: (new Date()).valueOf()
      }, this.dish.id));
      this.currentComment = '';
    }
  }

  public likeAlreadySet(): boolean {
    return this.dish.likes.includes(this.userId);
  }

  public setLike(event: MouseEvent): void {
    event.stopImmediatePropagation();

    if (!this.likeAlreadySet()) {
      this.setLikeEvent.emit(this.dish.id);
    } else {
      this.unsetLikeEvent.emit(this.dish.id);
    }
  }

  public openComments(event: MouseEvent): void {
    event.stopPropagation();
    this.commentsVisibility = true;
  }

  public closeComments(): void {
    this.commentsVisibility = false;
  }

  private getUserId(): void {
    this.userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);
  }

}
