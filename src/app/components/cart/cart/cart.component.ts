import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../services/cart.service";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {CartModel} from "../../../models/cart/cart.model";
import {GetIdFromRoute} from "../../../utility/route-processor";
import {Log} from "../../../utility/log";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: CartModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    try {
      this.loadCart(GetIdFromRoute(this.route));
    } catch (exception) {
      Log.exception(exception);
      OpenWarnSnackBar(this.snackBar, 'No identifier to load data.');
    }
  }

  private loadCart(cartId: number): void {
    this.cartService.getCart(cartId).subscribe((response) => {
      this.cartData = response;
      OpenSnackBar(this.snackBar, 'Loaded Cart: ' + this.cartData?.name);
    });
  }

  public clickProductDetails(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public clickRemoveProduct(): void {

  }

  public clickEditSocial(): void {

  }

  public clickAddProduct(): void {

  }

  public clickIncreaseCount(): void {

  }

  public clickDecreaseCount(): void {

  }

  public clickCheckoutCart(): void {

  }

  public clickBack(): void {
    this.location.back();
  }
}
