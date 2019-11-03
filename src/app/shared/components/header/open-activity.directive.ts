import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { RealTimeDataService } from '../../services/real-time-data.service';
import { User } from '../../models/user.model';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { ActivityService } from 'src/app/modules/activity/services/activity.service';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { GoogleApiService } from '../../services/gapi.service';

@AutoUnsubscribe()
@Directive({
  selector: '[appOpenActivity]'
})
export class OpenActivityDirective implements OnDestroy, OnInit {

  private currentUserSubscription: Subscription;
  private signInSubscription: Subscription;
  private user: User;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private routerHelper: RouterHelper,
    private settingsService: SettingsService,
    private googleApiService: GoogleApiService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  @HostListener('click')
  async goToActivity(): Promise<any> {
    if (this.user.accessToken) {
      this.routerHelper.navigateToPage(APP.pages.activity);
    } else {
      this.signInSubscription = this.googleApiService.singIn()
        .subscribe(async auth => {
          const authResponse = (await auth.signIn()).getAuthResponse();

          await this.settingsService.updateUserData({
            accessToken: authResponse.access_token,
            accessTokenExpiresIn: moment().add(1, 'h').valueOf()
          }, this.user.id);
          this.routerHelper.navigateToPage(APP.pages.activity);
        });
    }
  }

  private subscribeToCurrentUser(): void {
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {}

}
