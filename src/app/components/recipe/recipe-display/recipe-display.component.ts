import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeModel} from "../../../models/recipe/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";
import {GetIdFromRoute} from "../../../utility/route-processor";
import {OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit {

  recipeData: RecipeModel = {
    items: []
  };

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.loadRecipeData(GetIdFromRoute(this.route));
  }

  public navigateToRecipeEditing(recipeId?: number): void {
    const routeString = recipeId ? '/' + AppRoute.RECIPE_EDITING + '/' + recipeId : '/' + AppRoute.RECIPE_EDITING;
    this.router.navigate([routeString]);
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public navigateBack(): void {
    this.location.back();
  }

  private loadRecipeData(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId).subscribe({
      next: (response) => {
        this.recipeData = response;
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load recipe: ' + ParseErrorResponse(error));
      },
      complete: () => {
      }
    });
  }
}
