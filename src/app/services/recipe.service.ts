import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {RecipeModel} from "../models/recipe/recipe.model";
import {RecipeSummaryModel} from "../models/recipe/recipe-summary.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() {
    // TODO implement httpClient
  }

  private static mockRecipe(): RecipeModel {
    return {
      id: 1,
      name: 'Pasta',
      category: 'Fast Food',
      duration: 15,
      description: 'Goes fast',
      kcal: 500,
      carbohydrates: 20,
      protein: 30,
      fat: 40,
      items: [
        {
          productId: 1,
          productName: 'Item 1',
          count: 1,
          unit: 'GRAM',
          description: 'some description'
        },
        {
          productId: 2,
          productName: 'Item 2',
          count: 2,
          unit: 'GRAM',
        },
      ]
    }
  }

  private static mockRecipeSelection(): RecipeSummaryModel[] {
    return [
      {
        id: 1,
        name: 'Pasta',
        category: 'Fast Food',
        duration: 15,
        kcal: 500
      },
      {
        id: 2,
        name: 'Pizza',
        category: 'Fast Food',
        duration: 12,
        kcal: 600
      }
    ]
  }

  public getRecipe(recipeId: number): Observable<RecipeModel> {
    return of(RecipeService.mockRecipe());
  }

  public getRecipeSelection(): Observable<RecipeSummaryModel[]> {
    return of(RecipeService.mockRecipeSelection());
  }
}
