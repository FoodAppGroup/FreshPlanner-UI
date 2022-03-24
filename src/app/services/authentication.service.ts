import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {UserInfoModel} from "../models/authentication/user-info.model";
import {LoginModel} from "../models/authentication/login.model";
import {RegistrationModel} from "../models/authentication/registration.model";
import {UserAuthModel} from "../models/authentication/user-auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private controllerUrl = environment.backendApiUrl + '/auth';
  private defaultHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  // === POST ========================================================================================================

  public login(authLogin: LoginModel): Observable<UserAuthModel> {
    const endpointUrl = this.controllerUrl + '/login';
    return this.httpClient.post<UserAuthModel>(endpointUrl, authLogin, this.defaultHeaders);
  }

  public register(authRegistration: RegistrationModel): Observable<UserAuthModel> {
    const endpointUrl = this.controllerUrl + '/register';
    return this.httpClient.post<UserAuthModel>(endpointUrl, authRegistration, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getUserInfo(): Observable<UserInfoModel> {
    const endpointUrl = this.controllerUrl + '/info';
    return this.httpClient.get<UserInfoModel>(endpointUrl, this.defaultHeaders);
  }

  public getAuthRoles(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/roles';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteUser(): Observable<UserInfoModel> {
    const endpointUrl = this.controllerUrl + '/delete';
    return this.httpClient.delete<UserInfoModel>(endpointUrl, this.defaultHeaders);
  }
}
