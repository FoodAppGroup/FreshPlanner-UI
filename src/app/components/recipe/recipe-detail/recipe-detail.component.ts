import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/SnackBar";
import {RecipeModel} from "../../../models/recipe/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoute} from "../../../app-routing.module";
import {GetIdFromRoute} from "../../../utility/RouteProcessor";
import {Log} from "../../../utility/Log";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipeModel: RecipeModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    try {
      this.loadRecipe(GetIdFromRoute(this.route));
    } catch (exception) {
      Log.exception(exception);
      OpenWarnSnackBar(this.snackBar, 'No identifier to load data.');
    }
  }

  private loadRecipe(recipeId: number): void {
    this.recipeService.getRecipe(recipeId).subscribe((response) => {
      this.recipeModel = response;
      OpenSnackBar(this.snackBar, 'Loaded Recipe: ' + this.recipeModel?.name);
    });
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT + '/' + productId]);
  }

  public navigateBack(): void {
    this.location.back();
  }
}
