import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {UserInfoModel} from "../models/authentication/user-info.model";
import {LoginModel} from "../models/authentication/login.model";
import {RegistrationModel} from "../models/authentication/registration.model";
import {UserAuthModel} from "../models/authentication/user-auth.model";

const API_AUTH_URL = environment.backendApiUrl + '/api/auth';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  private static mockUserInfo(): UserInfoModel {
    return {
      username: 'some user',
      email: 'some@email.com',
      roles: [
        'role1',
        'role2'
      ]
    }
  }

  // AUTHENTICATION endpoints ==============================================================================================================

  public login(authLogin: LoginModel): Observable<UserAuthModel> {
    const url = API_AUTH_URL + '/login';
    return this.httpClient.post<UserAuthModel>(url, authLogin, HTTP_OPTIONS);
  }

  public register(authRegistration: RegistrationModel): Observable<UserAuthModel> {
    const url = API_AUTH_URL + '/register';
    return this.httpClient.post<UserAuthModel>(url, authRegistration, HTTP_OPTIONS);
  }

  // GET endpoints =========================================================================================================================

  public getUserInfo(username: string | undefined): Observable<UserInfoModel> {
    const url = API_AUTH_URL + '/user/get?username=' + username;
    // TODO return this.httpClient.get<UserInfoModel>(url, HTTP_OPTIONS);
    return of(AuthenticationService.mockUserInfo());
  }
}
