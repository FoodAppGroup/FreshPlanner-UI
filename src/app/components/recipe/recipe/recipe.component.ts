import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {Router} from "@angular/router";
import {RecipeSummaryModel} from "../../../models/recipe/recipe-summary.model";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipeSelection: RecipeSummaryModel[] | undefined;

  constructor(private location: Location,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.loadRecipeSelection()
  }

  public navigateToRecipeDetail(recipeId: number): void {
    this.router.navigate(['/' + AppRoute.RECIPE_DETAIL + '/' + recipeId]);
  }

  private loadRecipeSelection(): void {
    this.recipeService.getRecipeSelection().subscribe((response) => {
      this.recipeSelection = response;
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
