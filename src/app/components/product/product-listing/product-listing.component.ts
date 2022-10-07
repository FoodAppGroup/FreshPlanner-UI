import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {ProductModel} from "../../../models/product.model";
import {OpenWarnSnackBar} from "../../../utility/snackbar";

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  searchInput = '';
  productList: ProductModel[] = [];
  categorizedProducts: Map<string, ProductModel[]> | undefined;
  isLoading: boolean = false;

  constructor(private productService: ProductService,
              private snackBar: MatSnackBar,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.productList = response;
        this.categorizeProducts(response);
        if (!this.categorizedProducts) {
          OpenWarnSnackBar(this.snackBar, 'No products found.');
        }
      },
      error: (error) => {
        console.log(error);
        OpenWarnSnackBar(this.snackBar, 'Failed to load all products.');
      }
    }).add(() => {
      this.isLoading = false;
    });
  }

  public clickSearchProducts() {
    const list = this.productList.filter(product => {
      return product.name?.toLowerCase().includes(this.searchInput.toLowerCase());
    });
    this.categorizeProducts(list);
  }

  public clickAddToStock(productModel: ProductModel): void {
    // TODO not implemented yet
    OpenWarnSnackBar(this.snackBar, 'Not implemented yet!');
  }

  public clickAddToCart(productModel: ProductModel): void {
    // TODO not implemented yet
    OpenWarnSnackBar(this.snackBar, 'Not implemented yet!');
  }

  public clickDisplayProduct(productModel: ProductModel): void {
    if (!productModel.id) {
      OpenWarnSnackBar(this.snackBar, 'No product ID found.');
      return;
    }
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productModel.id]);
  }

  public clickCreateNewProduct(): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_EDIT]);
  }

  private categorizeProducts(products: ProductModel[] | undefined): void {
    if (!products || products.length === 0) {
      this.categorizedProducts = undefined;
      return;
    }
    this.categorizedProducts = new Map<string, ProductModel[]>();
    for (const product of products) {
      const category = product.category;
      if (category) {
        this.addItemToMap(category, product);
      } else {
        this.addItemToMap('Others', product);
      }
    }
  }

  private addItemToMap(category: string, product: ProductModel) {
    if (this.categorizedProducts?.has(category)) {
      this.categorizedProducts.get(category)?.push(product);
    } else {
      this.categorizedProducts?.set(category, [product]);
    }
  }
}
