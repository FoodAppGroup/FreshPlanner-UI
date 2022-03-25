import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";
import {StorageItemModel, StorageModel} from "../../../models/storage/storage.model";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetIdFromRoute} from "../../../utility/RouteProcessor";
import {Log} from "../../../utility/Log";
import {AuthenticationService} from "../../../services/authentication.service";
import {AutoComplete, ProductAutoComplete} from "../../../utility/AutoComplete";
import {ProductService} from "../../../services/product.service";
import {ProductSummaryModel} from "../../../models/product/product-summary.model";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  ProductSummaryModel = ProductSummaryModel;
  storageData: StorageModel | undefined;
  categorizedItems: Map<string, StorageItemModel[]> | undefined;

  infoPanelOpened: boolean = false;
  userAC = new AutoComplete();
  productAC = new ProductAutoComplete();

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storageService: StorageService,
              private authService: AuthenticationService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    try {
      this.loadStorage(GetIdFromRoute(this.route));
    } catch (exception) {
      Log.exception(exception);
      OpenWarnSnackBar(this.snackBar, 'No identifier to load data.');
    }
  }

  public navigateToProduct(productId: number | undefined): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public submitDeleteStorage(): void {
    if (this.storageData?.id) {
      this.storageService.deleteStorage(this.storageData.id).subscribe((response) => {
        this.storageData = response;
        OpenSnackBar(this.snackBar, 'Deleted Storage: ' + this.storageData.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage data not available.');
    }
  }

  public submitRemoveItem(productId: number | undefined): void {
    if (this.storageData?.id && productId) {
      this.storageService.deleteStorageItem(this.storageData.id, productId).subscribe((response) => {
        this.storageData = response;
        this.buildItemMap(response.items);
        OpenSnackBar(this.snackBar, 'Removed Item: ' + productId);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage data not available.');
    }
  }

  public submitAddItem(productId: number | undefined): void {
    let storageItem: StorageItemModel = {
      productId: productId,
      count: 1 // TODO implement variable count at input
    }
    if (this.storageData?.id) {
      this.storageService.addStorageItem(this.storageData.id, storageItem).subscribe((response) => {
        this.storageData = response;
        this.buildItemMap(response.items);
        this.productAC.reset();
        OpenSnackBar(this.snackBar, 'Added Item: ' + productId);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage data not available.');
    }
  }

  public submitAddUser(username: string): void {
    if (this.storageData?.id) {
      this.storageService.addUser(this.storageData.id, username).subscribe((response) => {
        this.storageData = response;
        this.userAC.reset();
        OpenSnackBar(this.snackBar, 'Added User: ' + username);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage data not available.');
    }
  }

  public submitRemoveUser(username: string): void {
    if (this.storageData?.id) {
      this.storageService.removeUser(this.storageData.id, username).subscribe((response) => {
        this.storageData = response;
        OpenSnackBar(this.snackBar, 'Removed User: ' + username);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Storage data not available.');
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  public loadUserOptions(): void {
    this.authService.getUsers().subscribe((response) => {
      this.userAC.options = response;
    });
  }

  public loadProductOptions(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.productAC.options = response;
    });
  }

  private loadStorage(storageId: number): void {
    this.storageService.getStorageById(storageId).subscribe((response) => {
      this.storageData = response;
      this.buildItemMap(response.items);
    });
  }

  private buildItemMap(items: StorageItemModel[] | undefined): void {
    if (items) {
      this.categorizedItems = new Map<string, StorageItemModel[]>();
      for (const item of items) {
        const category = item.category;
        if (category) {
          this.addItemToMap(category, item);
        } else {
          this.addItemToMap('Others', item);
        }
      }
    } else {
      this.categorizedItems = undefined;
    }
  }

  private addItemToMap(category: string, item: StorageItemModel) {
    if (this.categorizedItems?.has(category)) {
      this.categorizedItems.get(category)?.push(item);
    } else {
      this.categorizedItems?.set(category, [item]);
    }
  }
}
