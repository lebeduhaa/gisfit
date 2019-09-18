import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { settingsRouteAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  animations: [
    settingsRouteAnimation
  ]
})
export class SettingsComponent {

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
