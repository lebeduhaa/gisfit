import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatDialog } from '@angular/material/dialog';

import { settingsRouteAnimation } from 'src/app/shared/animations';
import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { SettingsService } from '../../services/settings.service';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { APP } from 'src/app/shared/constants';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  animations: [
    settingsRouteAnimation
  ]
})
export class SettingsComponent extends FirebaseCloudMessaging implements OnInit {

  public isMobile = APP.isMobile;

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService,
    protected dialog: MatDialog,
    private realTimeDataService: RealTimeDataService
  ) {
    super(messaging, settingsService, dialog);
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  private subscribeToCurrentUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.init(user);
      });
  }

}
