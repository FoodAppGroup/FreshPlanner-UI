import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {RecipeModel} from "../../../models/recipe/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";
import {GetIdFromRoute} from "../../../utility/route-processor";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipeData: RecipeModel;
  recipeCreationDisabled: boolean;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) {
    this.recipeData = this.initDefaultRecipeData();
    this.recipeCreationDisabled = true;
  }

  ngOnInit(): void {
    try {
      this.loadRecipeData(GetIdFromRoute(this.route));
    } catch (exception) {
      this.recipeCreationDisabled = false;
    }
  }

  public startRecipeCreation(): void {
    this.recipeCreationDisabled = false;
    this.recipeData = this.initDefaultRecipeData();
  }

  public cancelRecipeCreation(): void {
    this.recipeCreationDisabled = true;
    this.loadRecipeData(GetIdFromRoute(this.route));
  }

  public submitRecipeCreation(): void {
    this.recipeService.addRecipe(this.recipeData).subscribe((response) => {
      this.recipeData = response;
      this.recipeCreationDisabled = true;
      OpenSnackBar(this.snackBar, 'Created Recipe: ' + this.recipeData.name);
    });
  }

  public deleteRecipe(): void {
    if (this.recipeData.id) {
      this.recipeService.deleteRecipeById(this.recipeData.id).subscribe((response) => {
        this.recipeData = response;
        this.recipeCreationDisabled = false;
        OpenSnackBar(this.snackBar, 'Deleted Recipe: ' + this.recipeData.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Recipe ID not available.');
    }
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public navigateBack(): void {
    this.location.back();
  }

  private initDefaultRecipeData(): RecipeModel {
    return this.recipeData = {
      id: undefined,
      name: '',
      category: '',
      duration: 15,
      description: '',
      items: []
    }
  }

  private loadRecipeData(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId).subscribe((response) => {
      this.recipeData = response;
    });
  }
}
