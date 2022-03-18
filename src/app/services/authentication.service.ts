import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {LoginRequest} from "../models/login-request";
import {JwtResponse} from "../models/jwt-response";
import {RegistrationRequest} from "../models/registration-request";
import {UserInfoResponse} from "../models/user-info-response";
import {RoleRequestModel} from "../models/role-request-model";

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

  // AUTHENTICATION endpoints ==============================================================================================================

  public login(authLogin: LoginRequest): Observable<JwtResponse> {
    const url = API_AUTH_URL + '/login';
    return this.httpClient.post<JwtResponse>(url, authLogin, HTTP_OPTIONS);
  }

  public register(authRegistration: RegistrationRequest): Observable<JwtResponse> {
    const url = API_AUTH_URL + '/register';
    return this.httpClient.post<JwtResponse>(url, authRegistration, HTTP_OPTIONS);
  }

  // GET endpoints =========================================================================================================================

  public getUserInfo(username: string | undefined): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/user/get?username=' + username;
    return this.httpClient.get<UserInfoResponse>(url, HTTP_OPTIONS);
  }

  public getAllRoleRequests(): Observable<RoleRequestModel[]> {
    const url = API_AUTH_URL + '/role-request/get/all';
    return this.httpClient.get<RoleRequestModel[]>(url, HTTP_OPTIONS);
  }

  public getAuthRoles(): Observable<string[]> {
    const url = API_AUTH_URL + '/option/roles';
    return this.httpClient.get<string[]>(url, HTTP_OPTIONS);
  }

  // PUT endpoints =========================================================================================================================

  public requestRole(roleRequest: RoleRequestModel): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/role/request';
    return this.httpClient.put<UserInfoResponse>(url, roleRequest, HTTP_OPTIONS);
  }

  public rejectRole(roleRequest: RoleRequestModel): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/role/reject';
    return this.httpClient.put<UserInfoResponse>(url, roleRequest, HTTP_OPTIONS);
  }

  public removeRole(roleRequest: RoleRequestModel): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/role/remove';
    return this.httpClient.put<UserInfoResponse>(url, roleRequest, HTTP_OPTIONS);
  }

  // POST endpoints ========================================================================================================================

  public confirmRole(roleRequest: RoleRequestModel): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/role/confirm';
    return this.httpClient.post<UserInfoResponse>(url, roleRequest, HTTP_OPTIONS);
  }

  // PROTOTYPE endpoints ===================================================================================================================

  public updateUserPassword(newPassword: string | undefined, oldPassword: string | undefined): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/user/update/password?newPassword=' + newPassword + '&oldPassword=' + oldPassword;
    return this.httpClient.put<UserInfoResponse>(url, HTTP_OPTIONS);
  }

  public updateUserEmail(email: string): Observable<UserInfoResponse> {
    const url = API_AUTH_URL + '/user/update/email?email=' + email;
    return this.httpClient.put<UserInfoResponse>(url, HTTP_OPTIONS);
  }
}
