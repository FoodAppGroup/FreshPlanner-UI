import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeModel} from "../../../models/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";
import {Store} from "@ngrx/store";
import {RecipeAction, RecipeState} from "../../../stores/recipe.reducer";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit {

  recipeData: RecipeModel = {
    items: []
  };
  isLoading = false;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService,
              private recipeStore: Store<RecipeState>) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const recipeId = routeId ? parseInt(routeId) : 0;
    this.recipeStore.select(RecipeAction.get).subscribe((storeRecipe) => {
      if (storeRecipe && storeRecipe.id === recipeId) {
        this.recipeData = storeRecipe;
      } else {
        this.fetchRecipeData(recipeId);
      }
    });
  }

  public navigateToRecipeEditing(recipeId?: number): void {
    const routeString = recipeId ? `/${AppRoute.RECIPE_EDITING}/${recipeId}` : `/${AppRoute.RECIPE_EDITING}`;
    this.router.navigate([routeString]);
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate([`/${AppRoute.PRODUCT_DETAIL}/${productId}`]);
  }

  public navigateBack(): void {
    this.location.back();
  }

  private fetchRecipeData(recipeId: number): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(recipeId).subscribe({
      next: (response) => {
        this.recipeData = response;
        this.recipeStore.dispatch(RecipeAction.set({recipe: response}));
        OpenSnackBar(this.snackBar, 'Loaded recipe: ' + response.name);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load recipe: ' + ParseErrorResponse(error));
      }
    }).add(() => {
      this.isLoading = false;
    });
  }
}
