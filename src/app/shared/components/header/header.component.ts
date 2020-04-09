import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { User } from '../../models/user.model';
import { RealTimeDataService } from '../../services/real-time-data.service';
import { expandAnimation } from '../../animations';
import { userIsWithNecessaryData } from '../../helpers';
import { WelcomeComponent } from './welcome/welcome.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  animations: [
    expandAnimation
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  public activitySelected: boolean;
  public user: User;
  public isMobile: boolean;
  public mobileMenuIsOpened: boolean;
  public filledUserData: boolean;

  private userSubscription: Subscription;
  private popupWasOpened: boolean;

  constructor(
    private authService: AuthService,
    private routerHelper: RouterHelper,
    private router: Router,
    private realTimeDataService: RealTimeDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isMobile = APP.isMobile;
    this.detectCurrentUrl();
    this.subscribeToUser();
    this.router.events
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
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.detectFilledUserData();
      });
  }

  private detectFilledUserData(): void {
    this.filledUserData = userIsWithNecessaryData(this.user);

    if (userIsWithNecessaryData(this.user)) {
      this.filledUserData = true;
    } else {
      if (!this.popupWasOpened) {
        this.dialog.open(WelcomeComponent, {
          width: '500px'
        });
        this.popupWasOpened = true;
      }
    }
  }

  ngOnDestroy() {}

}
