import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { RealTimeDataService } from '../../services/real-time-data.service';
import { expandAnimation } from '../../animations';

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

  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private routerHelper: RouterHelper,
    private router: Router,
    private realTimeDataService: RealTimeDataService
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
      });
  }

  ngOnDestroy() {}

}
