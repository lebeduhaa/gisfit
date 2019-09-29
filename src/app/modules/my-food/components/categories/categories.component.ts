import { Component, Output, EventEmitter } from '@angular/core';

import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.css']
})
export class CategoriesComponent {

  @Output() selectCategoryEvent = new EventEmitter<string[]>();

  public categories = APP.categories;
  public selectedCategories: string[] = [];

  public categorySelected(categoryName: string): boolean {
    return this.selectedCategories.includes(categoryName);
  }

  public selectCategory(categoryName: string): void {
    if (this.selectedCategories.includes(categoryName)) {
      const categoryIndex = this.selectedCategories.findIndex(category => category === categoryName);

      this.selectedCategories.splice(categoryIndex, 1);
    } else {
      this.selectedCategories.push(categoryName);
    }

    this.selectCategoryEvent.emit(this.selectedCategories);
  }

}
