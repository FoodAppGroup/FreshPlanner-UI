import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
