import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { RealTimeDataService } from '../../services/real-time-data.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';
import { ActivityService } from 'src/app/modules/activity/services/activity.service';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';

@AutoUnsubscribe()
@Directive({
  selector: '[appOpenActivity]'
})
export class OpenActivityDirective implements OnDestroy, OnInit {

  private currentUserSubscription: Subscription;
  private user: User;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private routerHelper: RouterHelper,
    private activityService: ActivityService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  @HostListener('click')
  async goToActivity(): Promise<any> {
    if (this.user.accessToken) {
      this.routerHelper.navigateToPage(APP.pages.activity);
    } else {
      const result = await this.activityService.googleSignIn();

      await this.settingsService.updateUserData({accessToken: result.credential.accessToken}, this.user.id);
      this.routerHelper.navigateToPage(APP.pages.activity);
    }
  }

  private subscribeToCurrentUser(): void {
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {}

}
