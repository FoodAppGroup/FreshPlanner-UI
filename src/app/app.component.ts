import {Component} from '@angular/core';
import {AppRoute} from "./app-routing.module";
import {AuthAction} from "./stores/auth.action";
import {Store} from "@ngrx/store";
import {AuthState} from "./stores/auth.reducer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AppRoute = AppRoute;
  isConnected = false;
  openAuthNavigation = false;


  constructor(private router: Router,
              private authStore: Store<AuthState>) {
    this.authStore.select(AuthAction.isPresent).subscribe((data) => this.isConnected = data);
  }

  public submitLogout(): void {
    this.authStore.dispatch(AuthAction.reset());
    this.router.navigate(['/' + AppRoute.DASHBOARD]);
  }
}
