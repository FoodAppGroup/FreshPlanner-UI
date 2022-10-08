import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {Router} from "@angular/router";
import {RecipeModel} from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.scss']
})
export class RecipeListingComponent implements OnInit {

  recipeData: RecipeModel[] | undefined;

  constructor(private location: Location,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.loadRecipeSelection()
  }

  public navigateToRecipeDetail(recipeId?: number): void {
    this.router.navigate(['/' + AppRoute.RECIPE_DISPLAY + '/' + recipeId]);
  }

  private loadRecipeSelection(): void {
    this.recipeService.getAllRecipes().subscribe((response) => {
      this.recipeData = response;
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
