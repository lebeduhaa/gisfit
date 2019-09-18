import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

  public headerVisibility: boolean;
  public currentUrl: string;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.router.events
      .subscribe(event => this.parseRouterEvent(event));
  }

  public getClassObject(): any {
    if (this.currentUrl) {
      return {
        'app__background_settings': this.currentUrl.includes('settings'),
        'app__background_my-food': this.currentUrl.includes('my-food'),
        'app__background_auth': this.currentUrl.includes('auth')
      };
    }
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
      this.currentUrl = event.url;
      this.changeDetectorRef.markForCheck();
    }
  }

}
