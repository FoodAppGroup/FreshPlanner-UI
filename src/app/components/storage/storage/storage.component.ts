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
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  storageData: StorageModel | undefined;
  infoPanelOpened: boolean = false;
  usernameInput: string = '';
  usernameInputControl = new FormControl();
  usernameOptions: string[] = ['One', 'Two', 'Three'];
  usernameFilteredOptions: Observable<string[]>;

  itemCategories: string[] = this.filterItemCategories();

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
    this.usernameFilteredOptions = this.usernameInputControl.valueChanges.pipe(
      startWith(''),
      map(value => this.usernameOptions.filter(option => option.toLowerCase().includes(value.toLowerCase()))),
    );
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

  public submitRemoveUser(username: string) {
    // TODO implement RemoveUser
  }

  public submitAddUser(username: string) {
    // TODO implement AddUser
  }

  public filterItemsByCategory(items: StorageItemModel[] | undefined, category: string): StorageItemModel[] {
    if (!items || items.length === 0) {
      return [];
    } else {
      if (category === 'Others') {
        return items.filter(item => item.category === undefined || item.category === '');
      } else {
        return items.filter(item => item.category === category);
      }
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  private loadStorage(storageId: number): void {
    this.storageService.getStorageById(storageId).subscribe((response) => {
      this.storageData = response;
      this.itemCategories = this.filterItemCategories(response.items);
      OpenSnackBar(this.snackBar, 'Loaded Storage: ' + this.storageData?.name);
    });
  }

  private filterItemCategories(items?: StorageItemModel[] | undefined): string[] {
    if (!items || items.length === 0) {
      return ['No Items found!'];
    } else {
      return [...new Set(items.map(item => item?.category ? item.category : 'Others'))];
    }
  }
}
