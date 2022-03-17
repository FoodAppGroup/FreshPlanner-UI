import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductModel} from "../models/product.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllProducts(): Observable<ProductModel[]> {
    let demo: ProductModel[] = [
      {
        id: 1,
        name: 'demo'
      },
      {
        id: 2,
        name: 'abc'
      }
    ];
    return of(demo);
  }
}
