import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductModel} from "../models/product/product.model";
import {ProductSummaryModel} from "../models/product/product-summary.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private controllerUrl = environment.backendApiUrl + '/product';
  private defaultHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  // === POST ========================================================================================================

  public createProduct(productModel: ProductModel): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/insert';
    return this.httpClient.post <ProductModel>(endpointUrl, productModel, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getAllProducts(): Observable<ProductSummaryModel[]> {
    return this.httpClient.get<ProductSummaryModel[]>(this.controllerUrl);
  }

  public getProductById(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/get/' + productId;
    return this.httpClient.get<ProductModel>(endpointUrl, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteProduct(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + productId;
    return this.httpClient.delete <ProductModel>(endpointUrl, this.defaultHeaders);
  }

}
