import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {UserInfoModel} from "../../../models/authentication/user-info.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {OpenSnackBar} from "../../../utility/SnackBar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfoData: UserInfoModel | undefined;
  editingDisabled = true;

  constructor(private location: Location,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    this.authService.getUserInfo('mock').subscribe((response) => {
      this.userInfoData = response;
      OpenSnackBar(this.snackBar, 'Loaded Profile: ' + this.userInfoData?.username);
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}
