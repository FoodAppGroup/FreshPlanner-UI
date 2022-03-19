import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductModel} from "../models/product/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private controllerUrl = environment.backendApiUrl + '/product'

  constructor(private httpClient: HttpClient) {
  }

  public getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.controllerUrl);
  }
}
