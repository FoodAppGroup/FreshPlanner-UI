import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";
import {StorageModel} from "../../../models/storage/storage.model";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  storageModel: StorageModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    let storageId = 1; //TODO implement storage selection
    this.loadStorage(storageId);
  }

  public navigateToProduct(productId: number): void {
    // TODO use productId
    this.router.navigate(['/' + AppRoute.PRODUCT]);
  }

  private loadStorage(storageId: number): void {
    this.storageService.getStorage(storageId).subscribe((response) => {
      this.storageModel = response;
      OpenSnackBar(this.snackBar, 'Loaded Storage: ' + this.storageModel?.name);
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
