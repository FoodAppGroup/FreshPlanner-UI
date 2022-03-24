import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";
import {StorageModel} from "../../../models/storage/storage.model";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetIdFromRoute} from "../../../utility/RouteProcessor";
import {Log} from "../../../utility/Log";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  storageData: StorageModel | undefined;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    try {
      this.loadStorage(GetIdFromRoute(this.route));
    } catch (exception) {
      Log.exception(exception);
      OpenWarnSnackBar(this.snackBar, 'No identifier to load data.');
    }
  }

  public navigateToProduct(productId: number): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public deleteStorage(): void {
    if (this.storageData?.id) {
      this.storageService.deleteStorage(this.storageData.id).subscribe((response) => {
        this.storageData = response;
        OpenSnackBar(this.snackBar, 'Deleted Storage: ' + this.storageData.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage ID not available.');
    }
  }

  private loadStorage(storageId: number): void {
    this.storageService.getStorageById(storageId).subscribe((response) => {
      this.storageData = response;
      OpenSnackBar(this.snackBar, 'Loaded Storage: ' + this.storageData?.name);
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
