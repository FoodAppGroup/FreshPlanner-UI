import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-cart.dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  AppRoute = AppRoute;

  constructor() {
  }

  ngOnInit(): void {
  }

}
