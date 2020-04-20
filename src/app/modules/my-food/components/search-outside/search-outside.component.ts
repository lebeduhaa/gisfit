import { Component } from '@angular/core';

import { MyFoodService } from '../../services/my-food.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-search-outside',
  templateUrl: 'search-outside.component.html',
  styleUrls: ['search-outside.component.css']
})
export class SearchOutsideComponent extends Unsubscribe {

  public currentKey: string;

  constructor(
    private myFoodService: MyFoodService
  ) {
    super();
  }

  public search(): void {
    this.subscribeTo = this.myFoodService.searchOutside(this.currentKey)
      .subscribe(result => console.log(result.body));
  }

}
