import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  AppRoute = AppRoute;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }
}
