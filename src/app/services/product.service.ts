import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductModel} from "../models/product.model";

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

  public addProduct(productModel: ProductModel): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/insert';
    return this.httpClient.post<ProductModel>(endpointUrl, productModel, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.controllerUrl, this.defaultHeaders);
  }

  public getProductById(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/get/' + productId;
    return this.httpClient.get<ProductModel>(endpointUrl, this.defaultHeaders);
  }

  public searchProductsByName(name: string): Observable<ProductModel[]> {
    const endpointUrl = this.controllerUrl + '/search-name?name=' + name;
    return this.httpClient.get<ProductModel[]>(endpointUrl, this.defaultHeaders);
  }

  public searchProductsByCategory(category: string): Observable<ProductModel[]> {
    const endpointUrl = this.controllerUrl + '/search-category?category=' + category;
    return this.httpClient.get<ProductModel[]>(endpointUrl, this.defaultHeaders);
  }

  public getCategories(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/categories';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  public getUnits(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/units';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  // === PUT =========================================================================================================

  public updateProduct(productModel: ProductModel): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/update';
    return this.httpClient.put<ProductModel>(endpointUrl, productModel, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteProduct(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + productId;
    return this.httpClient.delete<ProductModel>(endpointUrl, this.defaultHeaders);
  }
}
