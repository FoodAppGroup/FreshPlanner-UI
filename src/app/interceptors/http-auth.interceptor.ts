import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from "../stores/auth.reducer";
import {AuthAction} from "../stores/auth.action";
import {UserAuthModel} from "../models/authentication/user-auth.model";

/**
 * Interceptor for Http Requests. Registered as Provider in app.module.ts.
 */
@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  private userAuth: UserAuthModel | undefined;

  /**
   * selects jwt from application context
   */
  constructor(private authStore: Store<AuthState>) {
    this.authStore.select(AuthAction.get).subscribe((data) => this.userAuth = data);
  }

  /**
   * intercepts all http requests and sets 'Authorization' header if possible
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.userAuth && this.userAuth.jwt && this.userAuth.jwtType) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', this.userAuth.jwtType + ' ' + this.userAuth.jwt)
      });
    }
    return next.handle(authReq);
  }
}
