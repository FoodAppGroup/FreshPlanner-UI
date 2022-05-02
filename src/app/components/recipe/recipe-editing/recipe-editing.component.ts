import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../../models/recipe/recipe.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeService} from "../../../services/recipe.service";
import {AppRoute} from "../../../app-routing.module";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";

@Component({
  selector: 'app-recipe-editing',
  templateUrl: './recipe-editing.component.html',
  styleUrls: ['./recipe-editing.component.scss']
})
export class RecipeEditingComponent implements OnInit {

  recipeData: RecipeModel = RecipeEditingComponent.defaultRecipeData();

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) {
  }

  private static defaultRecipeData(): RecipeModel {
    return {
      id: undefined,
      name: '',
      category: '',
      duration: 15,
      description: '',
      items: []
    }
  }

  ngOnInit(): void {
  }

  public submitCreate(): void {
    this.recipeService.addRecipe(this.recipeData).subscribe({
      next: (response) => {
        OpenSnackBar(this.snackBar, 'Created recipe ' + response.id + ': ' + response.name);
        this.navigateToRecipe(response.id);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to create recipe: ' + ParseErrorResponse(error));
      },
      complete: () => {
      }
    });
  }

  public submitDelete(): void {
    this.recipeService.deleteRecipe(this.recipeData.id).subscribe({
      next: (response) => {
        OpenSnackBar(this.snackBar, 'Deleted recipe ' + response.id + ': ' + response.name);
        this.recipeData = RecipeEditingComponent.defaultRecipeData();
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to delete recipe: ' + ParseErrorResponse(error));
      },
      complete: () => {
      }
    });
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public navigateBack(): void {
    this.location.back();
  }

  private navigateToRecipe(recipeId?: number): void {
    this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + recipeId]);
  }
}
