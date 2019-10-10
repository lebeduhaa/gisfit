import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageHelper } from './services/local-storage.service';
import { APP } from './constants';
import { RouterHelper } from './services/router.service';

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
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    if (userId) {
      return true;
    } else {
      this.routerHelper.navigateToPage(APP.pages.signIn);

      return false;
    }
  }

}
