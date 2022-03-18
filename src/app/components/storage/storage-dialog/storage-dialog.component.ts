import {Component, OnInit} from '@angular/core';
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-storage.dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss']
})
export class StorageDialogComponent implements OnInit {

  AppRoute = AppRoute;

  constructor() {
  }

  ngOnInit(): void {
  }

}
