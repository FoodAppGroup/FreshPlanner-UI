import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeModel} from "../../../models/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";
import {OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";
import {Store} from "@ngrx/store";
import {RecipeAction, RecipeState} from "../../../stores/recipe.reducer";

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit, OnDestroy {

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
    if (!routeId) {
      OpenWarnSnackBar(this.snackBar, 'Recipe ID not available from route.');
      this.location.back();
      return;
    }
    this.fetchRecipeData(parseInt(routeId));
  }

  ngOnDestroy(): void {
    this.recipeStore.dispatch(RecipeAction.set({recipe: this.recipeData}));
  }

  public clickEditRecipe(): void {
    if (!this.recipeData.id) {
      OpenWarnSnackBar(this.snackBar, 'Recipe ID not available.');
      return;
    }
    this.router.navigate([`/${AppRoute.RECIPE_EDITING}/${this.recipeData.id}`]);
  }

  public clickDisplayProduct(productId: number): void {
    this.router.navigate([`/${AppRoute.PRODUCT_DETAIL}/${productId}`]);
  }

  private fetchRecipeData(id: number): void {
    this.recipeStore.select(RecipeAction.get).subscribe((recipe) => {
      if (recipe && recipe.id === id) {
        this.recipeData = recipe;
      } else {
        this.loadRecipeData(id);
      }
    });
  }

  private loadRecipeData(id: number): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(id).subscribe({
      next: (response) => {
        this.recipeData = response;
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load recipe: ' + ParseErrorResponse(error));
        this.location.back();
      }
    }).add(() => {
      this.isLoading = false;
    });
  }
}
