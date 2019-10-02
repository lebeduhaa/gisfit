import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatDialog } from '@angular/material/dialog';

import { settingsRouteAnimation } from 'src/app/shared/animations';
import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { SettingsService } from '../../services/settings.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  animations: [
    settingsRouteAnimation
  ]
})
export class SettingsComponent extends FirebaseCloudMessaging implements OnInit, OnDestroy {

  private userSubscription: Subscription;

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog,
    private realTimeDataService: RealTimeDataService
  ) {
    super(messaging, settingsService, dialog);
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  private subscribeToCurrentUser(): void {
    this.userSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.init(user);
      });
  }

  ngOnDestroy() {}

}
