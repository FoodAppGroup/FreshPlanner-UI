import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RecipeItemModel, RecipeModel} from "../models/recipe/recipe.model";
import {RecipeSummaryModel} from "../models/recipe/recipe-summary.model";
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
    return this.httpClient.post <RecipeModel>(endpointUrl, recipeModel, this.defaultHeaders);
  }

  public addRecipeItem(recipeId: number, recipeItemModel: RecipeItemModel): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/insert-item/' + recipeId;
    return this.httpClient.post <RecipeModel>(endpointUrl, recipeItemModel, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getAllRecipes(): Observable<RecipeSummaryModel[]> {
    return this.httpClient.get<RecipeSummaryModel[]>(this.controllerUrl, this.defaultHeaders);
  }

  public getRecipeById(recipeId: number): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/get/' + recipeId;
    return this.httpClient.get<RecipeModel>(endpointUrl, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteRecipeItemById(recipeId: number): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + recipeId;
    return this.httpClient.delete <RecipeModel>(endpointUrl, this.defaultHeaders);
  }

  public deleteRecipeById(recipeId: number): Observable<RecipeModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + recipeId;
    return this.httpClient.delete <RecipeModel>(endpointUrl, this.defaultHeaders);
  }
}
