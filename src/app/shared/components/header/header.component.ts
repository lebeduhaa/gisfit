import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  public activitySelected: boolean;

  constructor(
    private authService: AuthService,
    private routerHelper: RouterHelper,
    private router: Router
  ) {}

  ngOnInit() {
    this.detectCurrentUrl();
    this.router.events
      .subscribe(event => this.parseRouterEvent(event));
  }

  public logout(): void {
    this.authService.signOut()
      .then(result => {
        this.routerHelper.navigateToPage(APP.pages.signIn);
      });
  }

  private detectCurrentUrl(): void {
    this.activitySelected = this.router.url.includes('activity');
  }

  private parseRouterEvent(event: Event): void {
    if (event instanceof NavigationEnd) {
      this.activitySelected = event.url.includes('activity');
    }
  }

}
