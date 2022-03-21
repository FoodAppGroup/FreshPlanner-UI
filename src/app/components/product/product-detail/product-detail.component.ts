import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../services/product.service";
import {GetIdFromRoute} from "../../../utility/RouteProcessor";
import {Log} from "../../../utility/Log";
import {OpenSnackBar, OpenWarnSnackBar} from "../../../utility/SnackBar";
import {ProductModel} from "../../../models/product/product.model";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productData: ProductModel | undefined;
  productCreationDisabled: boolean = true;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.initDefaultProductData();
    try {
      this.loadProductData(GetIdFromRoute(this.route));
    } catch (exception) {
      Log.exception(exception);
    }
  }

  public startProductCreation(): void {
    this.productCreationDisabled = false;
    this.initDefaultProductData();
  }

  public cancelProductCreation(): void {
    this.productCreationDisabled = true;
    this.loadProductData(GetIdFromRoute(this.route));
  }

  public submitProductCreation(): void {
    if (this.productData) {
      this.productService.createProduct(this.productData).subscribe((response) => {
        this.productData = response;
        this.productCreationDisabled = true;
        OpenSnackBar(this.snackBar, 'Created Product: ' + this.productData?.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Product Data not available.');
    }
  }

  public deleteProduct(): void {
    if (this.productData?.id) {
      this.productService.deleteProduct(this.productData.id).subscribe((response) => {
        this.productData = response;
        this.productCreationDisabled = false;
        OpenSnackBar(this.snackBar, 'Deleted Product: ' + this.productData?.name);
      });
    } else {
      OpenWarnSnackBar(this.snackBar, 'Product Data not available.');
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  private initDefaultProductData(): void {
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

  private loadProductData(productId: number): void {
    this.productService.getProductById(productId).subscribe((response) => {
      this.productData = response;
      OpenSnackBar(this.snackBar, 'Loaded Product: ' + this.productData?.name);
    });
  }
}
