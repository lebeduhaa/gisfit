import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelper {

  constructor(
    private router: Router
  ) {}

    public navigateToPage(path: string): void {
      this.router.navigate([path]);
    }

    public navigateToPageWithState(path: string, stateData: any): void {
      this.router.navigate([path], {state: {stateData}});
    }

}
