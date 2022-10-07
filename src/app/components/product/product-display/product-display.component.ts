import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../services/product.service";
import {OpenWarnSnackBar} from "../../../utility/snackbar";
import {ProductModel} from "../../../models/product.model";
import {AppRoute} from "../../../app-routing.module";
import {ParseErrorResponse} from "../../../utility/error-functions";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {

  productData: ProductModel = {};
  isLoading: boolean = false;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId) {
      OpenWarnSnackBar(this.snackBar, 'Product ID not available from route.');
      return;
    }
    this.loadProductData(parseInt(routeId));
  }

  public clickEditProduct(): void {
    if (!this.productData.id) {
      OpenWarnSnackBar(this.snackBar, 'Product ID not available.');
      return;
    }
    this.router.navigate([`/${AppRoute.PRODUCT_EDIT}/${this.productData.id}`]);
  }

  public clickNavigateBack(): void {
    this.location.back();
  }

  private loadProductData(productId: number): void {
    this.isLoading = true;
    this.productService.getProductById(productId).subscribe({
      next: (response) => this.productData = response,
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load product: ' + ParseErrorResponse(error));
        this.location.back();
      }
    }).add(() => {
      this.isLoading = false;
    });
  }
}
