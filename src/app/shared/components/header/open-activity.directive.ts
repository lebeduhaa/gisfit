import { Directive, HostListener, OnInit } from '@angular/core';

import * as moment from 'moment';

import { RealTimeDataService } from '../../services/real-time-data.service';
import { User } from '../../models/user.model';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { GoogleApiService } from '../../services/gapi.service';
import { Unsubscribe } from '../../classes/unsubscribe.class';

@Directive({
  selector: '[appOpenActivity]'
})
export class OpenActivityDirective extends Unsubscribe implements OnInit {

  private user: User;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private routerHelper: RouterHelper,
    private settingsService: SettingsService,
    private googleApiService: GoogleApiService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  @HostListener('click')
  async goToActivity(): Promise<any> {
    if (this.user.accessToken) {
      this.routerHelper.navigateToPage(APP.pages.activity);
    } else {
      this.subscribeTo = this.googleApiService.singIn()
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
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => this.user = user);
  }

}
