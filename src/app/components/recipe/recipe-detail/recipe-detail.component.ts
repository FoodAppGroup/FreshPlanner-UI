import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {RecipeModel} from "../../../models/recipe/recipe.model";
import {Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipeModel: RecipeModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    let recipeId = 1; //TODO implement recipe selection
    this.loadRecipe(recipeId);
  }

  private loadRecipe(recipeId: number): void {
    this.recipeService.getRecipe(recipeId).subscribe((response) => {
      this.recipeModel = response;
      OpenSnackBar(this.snackBar, 'Loaded Recipe: ' + this.recipeModel?.name);
    });
  }

  public navigateToProduct(productId: number): void {
    // TODO use productId
    this.router.navigate(['/' + AppRoute.PRODUCT]);
  }

  public navigateBack(): void {
    this.location.back();
  }
}
