import { Component } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterHelper } from '../../services/router.service';
import { APP } from '../../constants';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private routerHelper: RouterHelper
  ) {}

  public logout(): void {
    this.authService.signOut()
      .then(result => {
        this.routerHelper.navigateToPage(APP.pages.signIn);
      });
  }

}
