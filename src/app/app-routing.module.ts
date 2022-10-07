import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListingComponent} from "./components/product/product-listing/product-listing.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/authentication/profile/profile.component";
import {LoginComponent} from "./components/authentication/login/login.component";
import {RegistrationComponent} from "./components/authentication/registration/registration.component";
import {CartComponent} from "./components/cart/cart/cart.component";
import {StorageComponent} from "./components/storage/storage/storage.component";
import {RecipeListingComponent} from "./components/recipe/recipe-listing/recipe-listing.component";
import {RecipeDisplayComponent} from "./components/recipe/recipe-display/recipe-display.component";
import {ProductDisplayComponent} from "./components/product/product-display/product-display.component";
import {RecipeEditingComponent} from "./components/recipe/recipe-editing/recipe-editing.component";
import {ProductEditingComponent} from "./components/product/product-editing/product-editing.component";

export enum AppRoute {
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PRODUCT = 'product',
  PRODUCT_DETAIL = 'product/display',
  PRODUCT_EDIT = 'product/edit',
  CART = 'cart',
  STORAGE = 'storage',
  RECIPE = 'recipe',
  RECIPE_DISPLAY = 'recipe-view',
  RECIPE_EDITING = 'recipe-edit'
}

const routes: Routes = [
  {path: '', redirectTo: AppRoute.DASHBOARD, pathMatch: 'full'},
  {path: AppRoute.DASHBOARD, component: DashboardComponent},
  {path: AppRoute.PROFILE, component: ProfileComponent},
  {path: AppRoute.LOGIN, component: LoginComponent},
  {path: AppRoute.REGISTRATION, component: RegistrationComponent},
  {path: AppRoute.PRODUCT, component: ProductListingComponent},
  {path: AppRoute.PRODUCT_DETAIL + '/:id', component: ProductDisplayComponent},
  {path: AppRoute.PRODUCT_EDIT, component: ProductEditingComponent},
  {path: AppRoute.PRODUCT_EDIT + '/:id', component: ProductEditingComponent},
  {path: AppRoute.CART, component: CartComponent},
  {path: AppRoute.CART + '/:id', component: CartComponent},
  {path: AppRoute.STORAGE, component: StorageComponent},
  {path: AppRoute.STORAGE + '/:id', component: StorageComponent},
  {path: AppRoute.RECIPE, component: RecipeListingComponent},
  {path: AppRoute.RECIPE_DISPLAY, component: RecipeDisplayComponent},
  {path: AppRoute.RECIPE_DISPLAY + '/:id', component: RecipeDisplayComponent},
  {path: AppRoute.RECIPE_EDITING, component: RecipeEditingComponent},
  {path: AppRoute.RECIPE_EDITING + '/:id', component: RecipeEditingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
