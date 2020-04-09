import { Component } from '@angular/core';

import { MyFoodService } from '../../services/my-food.service';

@Component({
  selector: 'app-search-outside',
  templateUrl: 'search-outside.component.html',
  styleUrls: ['search-outside.component.css']
})
export class SearchOutsideComponent {

  public currentKey: string;

  constructor(
    private myFoodService: MyFoodService
  ) {}

  public search(): void {
    this.myFoodService.searchOutside(this.currentKey)
      .subscribe(result => console.log(result.body));
  }

}
