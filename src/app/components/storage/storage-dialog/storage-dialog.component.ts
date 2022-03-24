import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {StorageSummaryModel} from "../../../models/storage/storage-summary.model";

@Component({
  selector: 'app-storage.dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss']
})
export class StorageDialogComponent implements OnInit {

  storageSelectionData: StorageSummaryModel[] | undefined;

  constructor(private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loadStorageSelection();
  }

  public navigateToStorage(storageId: number | undefined): void {
    this.router.navigate(['/' + AppRoute.STORAGE + '/' + storageId]);
  }

  private loadStorageSelection(): void {
    this.storageService.getUserStorages().subscribe((response) => {
      this.storageSelectionData = response;
    });
  }
}
