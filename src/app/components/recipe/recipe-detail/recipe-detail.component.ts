import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }
}
