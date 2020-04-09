import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageHelper } from './services/local-storage.service';
import { APP } from './constants';
import { RouterHelper } from './services/router.service';
import { userIsWithNecessaryData } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private localStorageHelper: LocalStorageHelper,
    private routerHelper: RouterHelper
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): boolean {
    const userData = this.localStorageHelper.getCachedData(APP.cachedData.userData);

    if (userData) {
      if (url.includes(APP.pages.settings)) {
        return true;
      } else {
        if (userIsWithNecessaryData(userData)) {
          return true;
        } else {
          this.routerHelper.navigateToPage(APP.pages.settings);

          return false;
        }
      }
    } else {
      this.routerHelper.navigateToPage(APP.pages.signIn);

      return false;
    }
  }

}
