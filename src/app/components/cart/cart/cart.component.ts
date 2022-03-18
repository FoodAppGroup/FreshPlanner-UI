import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  AppRoute = AppRoute;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }
}
