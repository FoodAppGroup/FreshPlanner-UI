import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {JwtResponse} from "../models/jwt-response";
import {AuthState} from "../stores/auth.reducer";
import {AuthAction} from "../stores/auth.action";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  private tokenData: JwtResponse | undefined;

  constructor(private authStore: Store<AuthState>) {
    this.authStore.select(AuthAction.getJwt).subscribe(data => this.tokenData = data);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.tokenData && this.tokenData.token && this.tokenData.tokenType) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', this.tokenData.tokenType + ' ' + this.tokenData.token)
      });
    }
    return next.handle(authReq);
  }
}
