import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {RegistrationModel} from "../../../models/authentication/registration.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenSnackBar} from "../../../utility/snackbar";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../stores/auth.reducer";
import {AuthAction} from "../../../stores/auth.action";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationData: RegistrationModel = {
    username: '',
    email: '',
    password: ''
  };
  usernameMinLength: number = 5;
  passwordMinLength: number = 5;
  hidePassword: boolean = true;

  constructor(private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private authStore: Store<AuthState>) {
  }

  ngOnInit(): void {
  }

  public submitRegistration(): void {
    this.authService.register(this.registrationData).subscribe((response) => {
      this.authStore.dispatch(AuthAction.set({userAuth: response}));

      OpenSnackBar(this.snackBar, 'Welcome ' + response.username);
      this.router.navigate(['/' + AppRoute.DASHBOARD]);
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
