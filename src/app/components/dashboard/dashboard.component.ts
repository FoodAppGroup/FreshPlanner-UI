import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../app-routing.module";
import {MatDialog} from "@angular/material/dialog";
import {CartDialogComponent} from "../cart/cart-dialog/cart-dialog.component";
import {StorageDialogComponent} from "../storage/storage-dialog/storage-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  AppRoute = AppRoute;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public openCartDialog(): void {
    this.dialog.open(CartDialogComponent);
  }

  public openStorageDialog(): void {
    this.dialog.open(StorageDialogComponent);
  }
}
