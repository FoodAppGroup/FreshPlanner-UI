import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RecipeItemModel, RecipeModel} from "../models/recipe.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private controllerUrl = environment.backendApiUrl + '/recipe';
  private defaultHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  // === POST ========================================================================================================

  public addRecipe(recipeModel: RecipeModel): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/insert';
    return this.httpClient.post<RecipeModel>(endpointUrl, recipeModel, this.defaultHeaders);
  }

  public addRecipeItem(recipeId: number, recipeItemModel: RecipeItemModel): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/insert-item/' + recipeId;
    return this.httpClient.post<RecipeModel>(endpointUrl, recipeItemModel, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getAllRecipes(): Observable<RecipeModel[]> {
    return this.httpClient.get<RecipeModel[]>(this.controllerUrl, this.defaultHeaders);
  }

  public getRecipeById(recipeId: number): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/get/' + recipeId;
    return this.httpClient.get<RecipeModel>(endpointUrl, this.defaultHeaders);
  }

  public searchRecipesByName(name: string): Observable<RecipeModel[]> {
    const endpointUrl = this.controllerUrl + '/search-name?name=' + name;
    return this.httpClient.get<RecipeModel[]>(endpointUrl, this.defaultHeaders);
  }

  public searchRecipesByCategory(category: string): Observable<RecipeModel[]> {
    const endpointUrl = this.controllerUrl + '/search-category?category=' + category;
    return this.httpClient.get<RecipeModel[]>(endpointUrl, this.defaultHeaders);
  }

  public getCategories(): Observable<string[]> {
    const endpointUrl = this.controllerUrl + '/categories';
    return this.httpClient.get<string[]>(endpointUrl, this.defaultHeaders);
  }

  // === PUT =========================================================================================================

  public updateRecipeItem(recipeId: number, recipeItemModel: RecipeItemModel): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/update-item/' + recipeId;
    return this.httpClient.put<RecipeModel>(endpointUrl, recipeItemModel, this.defaultHeaders);
  }

  public updateRecipe(recipeModel: RecipeModel): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/update';
    return this.httpClient.put<RecipeModel>(endpointUrl, recipeModel, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteRecipeItem(recipeId: number, productId: number): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/delete-item/' + recipeId + '/' + productId;
    return this.httpClient.delete <RecipeModel>(endpointUrl, this.defaultHeaders);
  }

  public deleteRecipe(recipeId: number | undefined): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + recipeId;
    return this.httpClient.delete <RecipeModel>(endpointUrl, this.defaultHeaders);
  }
}
