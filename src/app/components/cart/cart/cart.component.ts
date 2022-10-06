import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../services/cart.service";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {CartModel} from "../../../models/cart/cart.model";

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
    let routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId) {
      OpenWarnSnackBar(this.snackBar, 'Undefined ID from route.');
      return;
    }
    this.loadCart(parseInt(routeId));
  }

  public clickProductDetails(productId: number | undefined): void {
    if (!productId) {
      OpenWarnSnackBar(this.snackBar, 'Undefined product ID.');
      return;
    }
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public clickRemoveProduct(itemIndex: number): void {

  }

  public clickIncreaseCount(itemIndex: number): void {

  }

  public clickEditSocial(): void {

  }

  public clickAddProduct(): void {

  }

  public clickDecreaseCount(itemIndex: number): void {

  }

  private loadCart(cartId: number | undefined): void {
    if (!cartId) {
      OpenWarnSnackBar(this.snackBar, 'Undefined cart ID.');
      return;
    }
    this.cartService.getCart(cartId).subscribe((response) => {
      this.cartData = response;
      OpenSnackBar(this.snackBar, 'Loaded Cart: ' + this.cartData?.name);
    });
  }

  public clickCheckoutCart(): void {

  }

  public clickBack(): void {
    this.location.back();
  }
}
