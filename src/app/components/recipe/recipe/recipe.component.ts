import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Location} from "@angular/common";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  AppRoute = AppRoute;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }
}
