import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeItemModel, RecipeModel} from "../../../models/recipe.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeService} from "../../../services/recipe.service";
import {AppRoute} from "../../../app-routing.module";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";
import {Store} from "@ngrx/store";
import {RecipeAction, RecipeState} from "../../../stores/recipe.reducer";

@Component({
  selector: 'app-recipe-editing',
  templateUrl: './recipe-editing.component.html',
  styleUrls: ['./recipe-editing.component.scss']
})
export class RecipeEditingComponent implements OnInit, OnDestroy {

  recipeData: RecipeModel = {
    items: []
  };
  recipeItemData: RecipeItemModel = {
    productName: ''
  };
  isLoading = false;
  isEditing = false;
  isMobileView = false;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService,
              private recipeStore: Store<RecipeState>) {
  }

  ngOnInit(): void {
    if (window.screen.width <= 440) {
      this.isMobileView = true;
    }
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.loadRecipeData(parseInt(routeId));
    } else {
      this.fetchRecipeDraft();
    }
  }

  ngOnDestroy(): void {
    if (!this.isEditing) {
      this.recipeStore.dispatch(RecipeAction.setDraft({recipe: this.recipeData}));
    }
  }

  public clickDisplayProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public clickCancel(): void {
    if (this.isEditing) {
      this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + this.recipeData.id]);
    } else {
      this.router.navigate(['/' + AppRoute.RECIPE]);
    }
  }

  public clickAddItemToRecipe(): void {
    this.recipeData.items?.push(this.recipeItemData);
    this.recipeItemData = {
      productName: ''
    };
  }

  public removeItemFromRecipe(item: RecipeItemModel): void {
    const index = this.recipeData.items.indexOf(item, 0);
    if (index > -1) {
      this.recipeData.items?.splice(index, 1);
    }
  }

  public clickSubmitCreate(): void {
    this.recipeService.addRecipe(this.recipeData).subscribe({
      next: (response) => {
        this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + response.id]);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to create recipe: ' + ParseErrorResponse(error));
      }
    });
  }

  public clickSubmitUpdate(): void {
    this.recipeService.updateRecipe(this.recipeData).subscribe({
      next: (response) => {
        this.recipeStore.dispatch(RecipeAction.set({recipe: response}));
        this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + response.id]);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to update recipe: ' + ParseErrorResponse(error));
      }
    });
  }

  public clickSubmitDelete(): void {
    if (!this.recipeData.id) {
      OpenWarnSnackBar(this.snackBar, 'Recipe ID not available.');
      return;
    }
    this.recipeService.deleteRecipe(this.recipeData.id).subscribe({
      next: (response) => {
        OpenSnackBar(this.snackBar, 'Deleted recipe: ' + response.name);
        this.router.navigate(['/' + AppRoute.RECIPE]);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to delete recipe: ' + ParseErrorResponse(error));
      }
    });
  }

  private fetchRecipeDraft(): void {
    this.recipeStore.select(RecipeAction.getDraft).subscribe((recipe) => {
      if (recipe) {
        this.recipeData = recipe;
      } else {
        this.setDefaultRecipeData();
      }
    });
  }

  private loadRecipeData(id: number): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(id).subscribe({
      next: (response) => {
        this.recipeData = response;
        this.isEditing = true;
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load recipe: ' + ParseErrorResponse(error));
      }
    }).add(() => {
      this.isLoading = false;
    });
  }

  private setDefaultRecipeData(): void {
    this.recipeData = {
      id: undefined,
      duration: 15,
      items: []
    }
  }
}
