import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { settingsRouteAnimation } from 'src/app/shared/animations';
import { FirebaseCloudMessaging } from 'src/app/shared/classes/fcm';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  animations: [
    settingsRouteAnimation
  ]
})
export class SettingsComponent extends FirebaseCloudMessaging implements OnInit {

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  constructor(
    protected messaging: AngularFireMessaging,
    protected settingsService: SettingsService
  ) {
    super(messaging, settingsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
