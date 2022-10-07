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

  /**
   * GET
   * @return existing products
   */
  public getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.controllerUrl, this.defaultHeaders);
  }

  /**
   * GET
   * @param productId database id
   * @return matching object
   */
  public getProductById(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/get/' + productId;
    return this.httpClient.get<ProductModel>(endpointUrl, this.defaultHeaders);
  }

  /**
   * GET
   * @param name partial name
   * @return matching objects
   */
  public searchProductsByName(name: string): Observable<ProductModel[]> {
    const endpointUrl = this.controllerUrl + '/search-name?name=' + name;
    return this.httpClient.get<ProductModel[]>(endpointUrl, this.defaultHeaders);
  }

  /**
   * GET
   * @param category partial category
   * @return matching objects
   */
  public searchProductsByCategory(category: string): Observable<ProductModel[]> {
    const endpointUrl = this.controllerUrl + '/search-category?category=' + category;
    return this.httpClient.get<ProductModel[]>(endpointUrl, this.defaultHeaders);
  }

  /**
   * POST
   * @param productModel with input data
   * @return created object
   */
  public addProduct(productModel: ProductModel): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/insert';
    return this.httpClient.post<ProductModel>(endpointUrl, productModel, this.defaultHeaders);
  }

  /**
   * PUT
   * @param productModel with input data
   * @return updated object
   */
  public updateProduct(productModel: ProductModel): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/update';
    return this.httpClient.put<ProductModel>(endpointUrl, productModel, this.defaultHeaders);
  }

  /**
   * DELETE
   * @param productId database id
   * @return deleted object
   */
  public deleteProduct(productId: number): Observable<ProductModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + productId;
    return this.httpClient.delete<ProductModel>(endpointUrl, this.defaultHeaders);
  }

  // === OPTION REQUESTS =============================================================================================

  /**
   * GET
   * @return existing categories
   */
  public getCategories(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/categories';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  /**
   * GET
   * @return existing units
   */
  public getUnits(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/units';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }
}
