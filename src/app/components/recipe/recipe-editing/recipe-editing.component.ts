import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeItemModel, RecipeModel} from "../../../models/recipe/recipe.model";
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

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService,
              private recipeStore: Store<RecipeState>) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.recipeStore.select(RecipeAction.get).subscribe((storeRecipe) => {
        const recipeId = parseInt(routeId);
        if (storeRecipe && storeRecipe.id === recipeId) {
          this.recipeData = storeRecipe;
        } else {
          this.fetchRecipeData(recipeId);
        }
      });
    } else {
      this.recipeStore.select(RecipeAction.get).subscribe((storeDraft) => {
        if (storeDraft) {
          this.recipeData = storeDraft;
        } else {
          this.recipeData = {
            id: undefined,
            duration: 15,
            items: []
          }
          OpenSnackBar(this.snackBar, 'Feel free to create a new recipe!');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.recipeStore.dispatch(RecipeAction.setDraft({recipe: this.recipeData}));
  }

  public addItemToRecipe(): void {
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

  private fetchRecipeData(recipeId: number): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(recipeId).subscribe({
      next: (response) => {
        this.recipeData = response;
        this.recipeStore.dispatch(RecipeAction.set({recipe: response}));
        OpenSnackBar(this.snackBar, 'Loaded recipe: ' + response.name)
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
