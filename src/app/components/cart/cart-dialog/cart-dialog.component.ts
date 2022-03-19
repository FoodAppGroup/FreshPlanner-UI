import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart.dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  cartSelectionData: Map<number, string> | undefined;

  constructor(private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadCartSelection();
  }

  public navigateToCart(cartId: number): void {
    this.router.navigate(['/' + AppRoute.CART + '/' + cartId]);
  }

  private loadCartSelection(): void {
    this.cartService.getCartSelection().subscribe((response) => {
      this.cartSelectionData = response;
    });
  }
}
