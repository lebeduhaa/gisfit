import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import * as deepEqual from 'deep-equal';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { User } from '../../models/user.model';
import { RealTimeDataService } from '../../services/real-time-data.service';
import { expandAnimation } from '../../animations';
import { userIsWithNecessaryData } from '../../helpers';
import { WelcomeComponent } from './welcome/welcome.component';
import { LocalStorageHelper } from '../../services/local-storage.service';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  animations: [
    expandAnimation
  ]
})
export class HeaderComponent extends Unsubscribe implements OnInit {

  public activitySelected: boolean;
  public user: User;
  public isMobile: boolean;
  public mobileMenuIsOpened: boolean;
  public filledUserData: boolean;

  private popupWasOpened: boolean;

  constructor(
    private authService: AuthService,
    private routerHelper: RouterHelper,
    private router: Router,
    private realTimeDataService: RealTimeDataService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private localStorageService: LocalStorageHelper
  ) {
    super();
  }

  ngOnInit() {
    this.isMobile = APP.isMobile;
    this.detectCurrentUrl();
    this.subscribeToUser();
    this.subscribeTo = this.router.events
      .subscribe(event => this.parseRouterEvent(event));
  }

  public logout(): void {
    this.authService.signOut()
      .then(result => {
        this.routerHelper.navigateToPage(APP.pages.signIn);
      });
  }

  public toggleMobileMenu(): void {
    this.mobileMenuIsOpened = !this.mobileMenuIsOpened;
  }

  private detectCurrentUrl(): void {
    this.activitySelected = this.router.url.includes('activity');
  }

  private parseRouterEvent(event: Event): void {
    if (event instanceof NavigationEnd) {
      this.activitySelected = event.url.includes('activity');
      this.mobileMenuIsOpened = false;
    }
  }

  private subscribeToUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.detectFilledUserData();
        this.changeDetectorRef.markForCheck();
      });
  }

  private detectFilledUserData(): void {
    this.filledUserData = userIsWithNecessaryData(this.user);

    if (userIsWithNecessaryData(this.user)) {
      this.filledUserData = true;
      
      if (!deepEqual(this.user, this.localStorageService.getCachedData(APP.cachedData.userData))) {
        this.localStorageService.cacheData(APP.cachedData.userData, this.user);
      }
    } else {
      if (!this.popupWasOpened) {
        this.dialog.open(WelcomeComponent, {
          width: '500px'
        });
        this.popupWasOpened = true;
      }
    }
  }

}
