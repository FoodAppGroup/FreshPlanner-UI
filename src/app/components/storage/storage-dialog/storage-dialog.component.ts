import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'app-storage.dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss']
})
export class StorageDialogComponent implements OnInit {

  storageSelection: Map<number, string> | undefined;

  constructor(private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loadStorageSelection();
  }

  public selectStorage(storageId: number): void {
    // TODO use storageId
    this.router.navigate(['/' + AppRoute.STORAGE]);
  }

  private loadStorageSelection(): void {
    this.storageService.getStorageSelection().subscribe((response) => {
      this.storageSelection = response;
    });
  }
}
