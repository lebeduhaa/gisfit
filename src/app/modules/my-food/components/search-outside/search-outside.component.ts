import { Component } from '@angular/core';

import { MyFoodService } from '../../services/my-food.service';
import { APP } from 'src/app/shared/constants';

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
    // this.myFoodService.searchOutside(this.currentKey)
    //   .subscribe(result => console.log(result));
    fetch(`${APP.searchOutsideUrl}?searchtext=мясо&lazy_steep=1`, {
      mode: 'no-cors',
      credentials: 'same-origin'
    })
      .then(response => {
        console.log(response);
        return response.text();
      })
      .then(response => console.log(response));
  }

}
