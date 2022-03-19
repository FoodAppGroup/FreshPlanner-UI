import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../services/cart.service";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {CartModel} from "../../../models/cart/cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  AppRoute = AppRoute;
  cartModel: CartModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    let cartId = 1; //TODO implement cart selection
    this.loadCart(cartId);
  }

  public navigateToProduct(productId: number): void {
    // TODO use productId
    this.router.navigate(['/' + AppRoute.PRODUCT]);
  }

  private loadCart(cartId: number): void {
    this.cartService.getCart(cartId).subscribe((response) => {
      this.cartModel = response;
      OpenSnackBar(this.snackBar, 'Loaded Cart: ' + this.cartModel?.name);
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
