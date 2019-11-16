import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: 'mobile-footer.component.html',
  styleUrls: ['mobile-footer.component.css']
})
export class MobileFooterComponent {

  @Output() selectProductCategory = new EventEmitter<string[]>();
  @Output() selectDishCategory = new EventEmitter<string[]>();

  public reactOnSelectProductCategoryEvent(categories: string[]): void {
    this.selectProductCategory.emit(categories);
  }

  public reactOnSelectDishCategoryEvent(categories: string[]): void {
    this.selectDishCategory.emit(categories);
  }

}
