import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {CartModel} from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    // TODO implement httpClient
  }

  private static mockCartSelection(): Map<number, string> {
    return new Map<number, string>([
      [1, 'Bonus'],
      [2, 'Aldi']
    ]);
  }

  private static mockCart(): CartModel {
    return {
      id: 1,
      name: 'Aldi',
      users: [
        'Florian',
        'Felix'
      ],
      items: [
        {
          productId: 1,
          productName: 'Item 1',
          count: 1,
          unit: 'GRAM',
        },
        {
          productId: 2,
          productName: 'Item 2',
          count: 2,
          unit: 'GRAM',
        }
      ]
    }
  }

  public getCart(cartId: number): Observable<CartModel> {
    return of(CartService.mockCart());
  }

  public getCartSelection(): Observable<Map<number, string>> {
    return of(CartService.mockCartSelection());
  }
}
