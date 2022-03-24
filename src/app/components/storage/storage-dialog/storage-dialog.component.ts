import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {StorageSummaryModel} from "../../../models/storage/storage-summary.model";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-storage.dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss']
})
export class StorageDialogComponent implements OnInit {

  storageSelectionData: StorageSummaryModel[] = [];
  storageCreationData: StorageSummaryModel = {
    name: 'New Storage'
  }
  storageCreationEnabled: boolean = false;

  constructor(private router: Router,
              public dialogRef: MatDialogRef<StorageDialogComponent>,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loadStorageSelection();
  }

  public submitStorageCreation(): void {
    this.storageService.addStorage(this.storageCreationData).subscribe((response) => {
      OpenSnackBar(this.snackBar, 'Created Storage: ' + response.name);
      this.navigateToStorage(response.id);
    });
  }


  public navigateToStorage(storageId: number | undefined): void {
    this.dialogRef.close();
    this.router.navigate(['/' + AppRoute.STORAGE + '/' + storageId]);
  }

  private loadStorageSelection(): void {
    this.storageService.getUserStorages().subscribe((response) => {
      this.storageSelectionData = response;
      if (response.length === 0) {
        this.storageCreationEnabled = true;
      }
    });
  }
}
