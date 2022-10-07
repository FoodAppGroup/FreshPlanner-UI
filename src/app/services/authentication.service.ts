import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {UserModel} from "../models/user.model";
import {LoginModel} from "../models/authentication/login.model";
import {RegistrationModel} from "../models/authentication/registration.model";
import {AuthModel} from "../models/authentication/auth.model";

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

  public login(authLogin: LoginModel): Observable<AuthModel> {
    const endpointUrl = this.controllerUrl + '/login';
    return this.httpClient.post<AuthModel>(endpointUrl, authLogin, this.defaultHeaders);
  }

  public register(authRegistration: RegistrationModel): Observable<AuthModel> {
    const endpointUrl = this.controllerUrl + '/register';
    return this.httpClient.post<AuthModel>(endpointUrl, authRegistration, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getUserInfo(): Observable<UserModel> {
    const endpointUrl = this.controllerUrl + '/info';
    return this.httpClient.get<UserModel>(endpointUrl, this.defaultHeaders);
  }

  public getAuthRoles(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/roles';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  public getUsers(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/users';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteUser(): Observable<UserModel> {
    const endpointUrl = this.controllerUrl + '/delete';
    return this.httpClient.delete<UserModel>(endpointUrl, this.defaultHeaders);
  }
}
