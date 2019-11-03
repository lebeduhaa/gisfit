import { Injectable } from '@angular/core';

import { GoogleAuthService } from 'ng-gapi'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(
    private googleAuth: GoogleAuthService,
  ) {}

  public singIn(): Observable<any> {
    return this.googleAuth.getAuth();
  }

  public async refreshAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.googleAuth.getAuth().toPromise().then(async auth => {
        const user = auth.currentUser.get();
        const response = await user.reloadAuthResponse();

        resolve(response.access_token);
      });
    });
  }

}
