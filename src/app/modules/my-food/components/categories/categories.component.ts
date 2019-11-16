import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { APP } from 'src/app/shared/constants';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() selectCategoryEvent = new EventEmitter<string[]>();

  @Input() caption: string;
  @Input() options: string[];

  public selectedCategories: string[];

  constructor(
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.selectedCategories = this.caption === 'Product categories' ?
      this.sharedDataService.selectedProductCategories :
      this.sharedDataService.selectedDishCategories;
  }

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
