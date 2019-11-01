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

}
