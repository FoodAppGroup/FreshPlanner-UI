import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {LoginModel} from "../../../models/authentication/login.model";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../services/authentication.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../stores/auth.reducer";
import {AuthAction} from "../../../stores/auth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginModel = {
    username: '',
    password: ''
  };
  hidePassword: boolean = true;

  constructor(private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private authStore: Store<AuthState>) {
  }

  ngOnInit(): void {
  }

  public submitLogin(): void {
    this.authService.login(this.loginData).subscribe((response) => {
      this.authStore.dispatch(AuthAction.set({userAuth: response}));

      OpenSnackBar(this.snackBar, 'Welcome back ' + response.username);
      this.router.navigate(['/' + AppRoute.DASHBOARD]);
    });
  }

  public navigateToRegistration(): void {
    this.router.navigate(['/' + AppRoute.REGISTRATION]);
  }

  public navigateBack(): void {
    this.location.back();
  }
}
