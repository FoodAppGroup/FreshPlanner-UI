import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../services/product.service";
import {GetIdFromRoute} from "../../../utility/route-processor";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ProductModel} from "../../../models/product/product.model";
import {AutoComplete} from "../../../utility/autocomplete-data";
import {AppRoute} from "../../../app-routing.module";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productData: ProductModel = this.defaultProductData();
  dbProductData: ProductModel | undefined;
  editingEnabled: boolean = false;
  creationEnabled: boolean = false;

  categoryAC = new AutoComplete();
  unitAC = new AutoComplete();

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.disableChanges();
    try {
      this.loadProductData(GetIdFromRoute(this.route));
    } catch (exception) {
      this.enableCreation();
    }
    this.loadCategoryOptions();
    this.loadUnitOptions();
  }

  public startCreation(): void {
    this.enableCreation();
    this.productData = this.defaultProductData();
  }

  public startEditing(): void {
    this.enableEditing();
  }

  public cancelEditing(): void {
    if (this.dbProductData) {
      this.productData = this.dbProductData;
      this.disableChanges();
    } else {
      OpenWarnSnackBar(this.snackBar, 'No product with this identifier.');
    }
  }

  public cancelCreation(): void {
    if (this.dbProductData) {
      this.productData = this.dbProductData;
      this.disableChanges();
    } else {
      OpenWarnSnackBar(this.snackBar, 'No product with this identifier.');
    }
  }

  public submitNewProduct(): void {
    this.productData.unit = this.unitAC.input;
    this.productData.category = this.categoryAC.input;
    this.productService.addProduct(this.productData).subscribe((response) => {
      this.setValidatedProductData(response);
      this.disableChanges();
      this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + response.id]);
      OpenSnackBar(this.snackBar, 'Created Product: ' + this.productData.name);
    });
  }

  public submitEditedProduct(): void {
    this.productData.unit = this.unitAC.input;
    this.productData.category = this.categoryAC.input;
    this.productService.updateProduct(this.productData).subscribe((response) => {
      this.setValidatedProductData(response);
      this.disableChanges();
      OpenSnackBar(this.snackBar, 'Updated Product: ' + this.productData.name);
    });
  }

  public submitDeleteProduct(): void {
    if (this.productData.id) {
      this.productService.deleteProductById(this.productData.id).subscribe((response) => {
        this.setValidatedProductData(this.productData);
        this.dbProductData = undefined;
        this.productData.id = undefined;
        this.enableCreation();
        OpenSnackBar(this.snackBar, 'Deleted Product: ' + this.productData.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Product ID not available.');
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  private loadProductData(productId: number): void {
    this.productService.getProductById(productId).subscribe((response) => {
      this.setValidatedProductData(response);
    });
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

  private setValidatedProductData(data: ProductModel) {
    this.productData = data;
    this.dbProductData = data;
    if (data.unit) {
      this.unitAC.input = data.unit;
    }
    if (data.category) {
      this.categoryAC.input = data.category;
    }
  }

  private disableChanges(): void {
    this.creationEnabled = false;
    this.editingEnabled = false;
    this.unitAC.inputControl.disable();
    this.categoryAC.inputControl.disable();
  }

  private enableCreation(): void {
    this.creationEnabled = true;
    this.editingEnabled = false;
    this.unitAC.inputControl.enable();
    this.categoryAC.inputControl.enable();
  }

  private enableEditing(): void {
    this.editingEnabled = true;
    this.creationEnabled = false;
    this.unitAC.inputControl.enable();
    this.categoryAC.inputControl.enable();
  }

  private defaultProductData(): ProductModel {
    return this.productData = {
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
}
