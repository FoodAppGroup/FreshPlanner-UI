import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {RegistrationModel} from "../../../models/authentication/registration.model";

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
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public submitRegistration(): void {
    this.router.navigate(['/' + AppRoute.DASHBOARD]);
  }

  public navigateBack(): void {
    this.location.back();
  }
}
