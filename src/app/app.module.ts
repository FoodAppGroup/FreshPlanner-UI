import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {MaterialModule} from "./material-module";
import {ProductComponent} from './components/product/product.component';
import {FlexModule} from "@angular/flex-layout";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/authentication/login/login.component';
import {ProfileComponent} from './components/authentication/profile/profile.component';
import {RegistrationComponent} from './components/authentication/registration/registration.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {StorageDialogComponent} from './components/storage/storage-dialog/storage-dialog.component';
import {StorageComponent} from './components/storage/storage/storage.component';
import {CartComponent} from './components/cart/cart/cart.component';
import {CartDialogComponent} from './components/cart/cart-dialog/cart-dialog.component';
import {RecipeComponent} from './components/recipe/recipe/recipe.component';
import {RecipeDetailComponent} from './components/recipe/recipe-detail/recipe-detail.component';
import {FormsModule} from "@angular/forms";
import {HttpAuthInterceptor} from "./interceptors/http-auth.interceptor";
import {AuthReducer} from "./stores/auth.reducer";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    ProductComponent,
    StorageComponent,
    StorageDialogComponent,
    CartComponent,
    CartDialogComponent,
    RecipeComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({authStateReducer: AuthReducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    FlexModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
