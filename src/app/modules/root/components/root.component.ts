import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { APP } from 'src/app/shared/constants';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { settingsRouteAnimation } from 'src/app/shared/animations';


@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    settingsRouteAnimation
  ]
})
export class RootComponent implements OnInit, OnDestroy {

  public headerVisibility: boolean;
  public backgroundImageUrl: string;
  public fakeBackgroundImageUrl: string;

  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private realTimeDataService: RealTimeDataService
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('English');
    this.routerSubscription = this.router.events
      .subscribe(event => this.parseRouterEvent(event));
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  private parseRouterEvent(event: Event): void {
    if (event instanceof NavigationEnd) {
      let result = false;

      APP.routesWithHeader.forEach(route => {
        if (event.url.includes(route)) {
          result = true;
        }
      });

      this.headerVisibility = result;
      this.changeDetectorRef.markForCheck();
      this.setCurrentBackgroundImage(event.url);
      this.setCurrentUserInterfaceLanguage();
    }
  }

  private setCurrentBackgroundImage(currentUrl: string): void {
    if (currentUrl.includes('settings')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/settings2.jpg';
      this.fakeBackgroundImageUrl = 'assets/img/backgrounds/settings-preview.jpg';
    } else
    if (currentUrl.includes('my-food')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/my-food.jpg';
      this.fakeBackgroundImageUrl = 'assets/img/backgrounds/my-food-preview.jpg';
    } else
    if (currentUrl.includes('auth')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/auth.jpg';
      this.fakeBackgroundImageUrl = 'assets/img/backgrounds/auth-preview.jpg';
    } else
    if (currentUrl.includes('add-product')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/my-food.jpg';
    } else
    if (currentUrl.includes('dishes')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/settings3.jpg';
    } else
    if (currentUrl.includes('videos')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/videos.jpg';
    } else
    if (currentUrl.includes('add-video')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/videos.jpg';
    } else
    if (currentUrl.includes('history')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/history.jpg';
    } else
    if (currentUrl.includes('activity')) {
      this.backgroundImageUrl = 'assets/img/backgrounds/activity4.jpg';
    } else {
      this.backgroundImageUrl = 'assets/img/backgrounds/auth.jpg';
      this.fakeBackgroundImageUrl = 'assets/img/backgrounds/auth-preview.jpg';
    }
  }

  private setCurrentUserInterfaceLanguage(): void {
    this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        if (user) {
          this.translateService.use(user.interfaceLanguage);
        }
      });
  }

  ngOnDestroy() {}

}