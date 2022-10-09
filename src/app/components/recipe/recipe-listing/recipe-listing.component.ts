import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {Router} from "@angular/router";
import {RecipeModel} from "../../../models/recipe.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenWarnSnackBar} from "../../../utility/snackbar";

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.scss']
})
export class RecipeListingComponent implements OnInit {

  searchInput = '';
  recipeList: RecipeModel[] = [];
  categorizedRecipeMap: Map<string, RecipeModel[]> | undefined;
  isLoading: boolean = false;

  constructor(private location: Location,
              private router: Router,
              private recipeService: RecipeService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadAllRecipes()
  }

  public clickDisplayRecipe(recipeId: number | undefined): void {
    if (!recipeId) {
      OpenWarnSnackBar(this.snackBar, 'No recipe ID found.');
      return;
    }
    this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + recipeId]);
  }

  public clickCreateNewRecipe(): void {
    this.router.navigate([`/${AppRoute.RECIPE_EDITING}`]);
  }

  public clickSearchRecipes() {
    const list = this.recipeList.filter(recipe => {
      return recipe.name?.toLowerCase().includes(this.searchInput.toLowerCase());
    });
    this.categorizeRecipes(list);
  }

  private loadAllRecipes(): void {
    this.isLoading = true;
    this.recipeService.getAllRecipes().subscribe({
      next: (response) => {
        this.recipeList = response;
        this.categorizeRecipes(response);
        if (!this.categorizedRecipeMap) {
          OpenWarnSnackBar(this.snackBar, 'No recipes found.');
        }
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load all recipes.');
      }
    }).add(() => {
      this.isLoading = false;
    });
  }

  private categorizeRecipes(recipes: RecipeModel[] | undefined): void {
    if (!recipes || recipes.length === 0) {
      this.categorizedRecipeMap = undefined;
      return;
    }
    this.categorizedRecipeMap = new Map<string, RecipeModel[]>();
    for (const recipe of recipes) {
      const category = recipe.category;
      if (category) {
        this.addItemToMap(category, recipe);
      } else {
        this.addItemToMap('Others', recipe);
      }
    }
  }

  private addItemToMap(category: string, recipe: RecipeModel) {
    if (this.categorizedRecipeMap?.has(category)) {
      this.categorizedRecipeMap.get(category)?.push(recipe);
    } else {
      this.categorizedRecipeMap?.set(category, [recipe]);
    }
  }
}
