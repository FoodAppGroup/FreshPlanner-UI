import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../services/product.service";
import {GetIdFromRoute} from "../../../utility/route-processor";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/snackbar";
import {ProductModel} from "../../../models/product/product.model";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productData: ProductModel;
  productCreationDisabled: boolean;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService) {
    this.productData = this.initDefaultProductData();
    this.productCreationDisabled = true;
  }

  ngOnInit(): void {
    try {
      this.loadProductData(GetIdFromRoute(this.route));
    } catch (exception) {
      this.productCreationDisabled = false;
    }
  }

  public startProductCreation(): void {
    this.productCreationDisabled = false;
    this.productData = this.initDefaultProductData();
  }

  public cancelProductCreation(): void {
    this.productCreationDisabled = true;
    this.loadProductData(GetIdFromRoute(this.route));
  }

  public submitProductCreation(): void {
    this.productService.addProduct(this.productData).subscribe((response) => {
      this.productData = response;
      this.productCreationDisabled = true;
      OpenSnackBar(this.snackBar, 'Created Product: ' + this.productData.name);
    });
  }

  public deleteProduct(): void {
    if (this.productData.id) {
      this.productService.deleteProductById(this.productData.id).subscribe((response) => {
        this.productData = response;
        this.productCreationDisabled = false;
        OpenSnackBar(this.snackBar, 'Deleted Product: ' + this.productData.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Product ID not available.');
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  private initDefaultProductData(): ProductModel {
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

  private loadProductData(productId: number): void {
    this.productService.getProductById(productId).subscribe((response) => {
      this.productData = response;
    });
  }
}
