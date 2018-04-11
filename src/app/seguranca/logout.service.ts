import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable()
export class LogoutService {

  private tokensRevokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this. tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true} )
                    .toPromise()
                    .then(() => {
                      this.auth.limparAccessToken();
                    });
  }

}
