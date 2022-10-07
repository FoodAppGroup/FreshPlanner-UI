import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/product.model";
import {AutoComplete} from "../../../utility/autocomplete-data";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../services/product.service";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ParseErrorResponse} from "../../../utility/error-functions";
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.scss']
})
export class ProductEditingComponent implements OnInit {

  productData: ProductModel = {};
  categoryAC = new AutoComplete();
  unitAC = new AutoComplete();
  isEditing = false;
  isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.loadProductData(routeId);
    this.loadCategoryOptions();
    this.loadUnitOptions();
  }

  public clickCancel(): void {
    if (this.isEditing) {
      this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + this.productData.id]);
    } else {
      this.router.navigate(['/' + AppRoute.PRODUCT]);
    }
  }

  public clickCreateNewProduct(): void {
    this.isEditing = false;
    this.setDefaultProductData();
  }

  public clickSubmitUpdate(): void {
    this.productData.unit = this.unitAC.input;
    this.productData.category = this.categoryAC.input;
    this.productService.updateProduct(this.productData).subscribe({
      next: (response) => this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + response.id]),
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to update product: ' + ParseErrorResponse(error));
      }
    });
  }

  public clickSubmitCreate(): void {
    this.productData.unit = this.unitAC.input;
    this.productData.category = this.categoryAC.input;
    this.productService.addProduct(this.productData).subscribe({
      next: (response) => this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + response.id]),
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to create product: ' + ParseErrorResponse(error));
      }
    });
  }

  public clickSubmitDelete(): void {
    if (!this.productData.id) {
      OpenWarnSnackBar(this.snackBar, 'Product ID not available.');
      return;
    }
    this.productService.deleteProduct(this.productData.id).subscribe({
      next: (response) => {
        OpenSnackBar(this.snackBar, 'Deleted Product: ' + response.name);
        this.router.navigate(['/' + AppRoute.PRODUCT]);
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load recipe: ' + ParseErrorResponse(error));
      }
    });
  }

  private loadProductData(routeId: string | null): void {
    if (routeId) { // if id found: load data from api
      this.isLoading = true;
      this.productService.getProductById(parseInt(routeId)).subscribe({
        next: (response) => {
          this.productData = response;
          if (response.unit) this.unitAC.input = response.unit;
          if (response.category) this.categoryAC.input = response.category;
          this.isEditing = true;
        },
        error: (error) => {
          console.log(error);
          this.setDefaultProductData();
          OpenWarnSnackBar(this.snackBar, 'Failed to load product: ' + ParseErrorResponse(error));
        }
      }).add(() => {
        this.isLoading = false;
      });
    } else { // else: prepare default data
      this.setDefaultProductData();
    }
  }

  private setDefaultProductData(): void {
    this.productData = {
      id: undefined,
      name: '',
      category: '',
      unit: 'GRAM',
      packageSize: 500,
      kcal: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0,
    }
  }

  private loadCategoryOptions(): void {
    this.productService.getCategories().subscribe((response) => {
      this.categoryAC.options = response;
    });
  }

  private loadUnitOptions(): void {
    this.productService.getUnits().subscribe((response) => {
      this.unitAC.options = response;
    });
  }
}
