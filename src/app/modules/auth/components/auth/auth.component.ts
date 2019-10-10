import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { authRouteAnimation } from 'src/app/shared/animations';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';
import { RouterHelper } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
  animations: [
    authRouteAnimation
  ]
})
export class AuthComponent implements OnInit {

  constructor(
    private localStorageHelper: LocalStorageHelper,
    private routerHelper: RouterHelper
  ) {}

  ngOnInit() {
    this.redirectAuthenticated();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  private redirectAuthenticated(): void {
    if (this.localStorageHelper.getCachedData(APP.cachedData.userId)) {
      this.routerHelper.navigateToPage(APP.pages.myFood);
    }
  }

}
