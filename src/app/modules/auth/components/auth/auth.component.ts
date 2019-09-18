import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { authRouteAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
  animations: [
    authRouteAnimation
  ]
})
export class AuthComponent {

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
