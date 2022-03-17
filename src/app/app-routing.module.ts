import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./components/product/product.component";

export enum AppRoute {
  PRODUCT = 'product'
}

const routes: Routes = [
  {path: '', redirectTo: AppRoute.PRODUCT, pathMatch: 'full'},
  {path: AppRoute.PRODUCT, component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
