import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductService} from "../../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Location} from "@angular/common";
import {AppRoute} from "../../../app-routing.module";
import {Router} from "@angular/router";
import {TableData} from "../../../utility/table-data";
import {ProductModel} from "../../../models/product/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductComponent implements OnInit, AfterViewInit {

  PRODUCT_COLUMN = PRODUCT_COLUMN;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  searchInput = '';
  doneFirstSearch = false;
  tableData = new TableData<ProductModel>([
    PRODUCT_COLUMN.ID,
    PRODUCT_COLUMN.NAME,
    PRODUCT_COLUMN.CATEGORY,
    PRODUCT_COLUMN.PACKAGE_SIZE,
    PRODUCT_COLUMN.UNIT,
    PRODUCT_COLUMN.KCAL,
    PRODUCT_COLUMN.CARBOHYDRATES,
    PRODUCT_COLUMN.PROTEIN,
    PRODUCT_COLUMN.FAT,
    PRODUCT_COLUMN.ACTIONS
  ]);

  constructor(private productService: ProductService,
              private snackBar: MatSnackBar,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tableData.afterViewInit(this.paginator, this.sort);
  }

  public submitSearchProducts() {
    this.productService.searchProductsByName(this.searchInput).subscribe((response) => {
      this.tableData.setData(response);
      this.doneFirstSearch = true;
    });
  }

  public navigateToProduct(productId: number | string): void {
    this.router.navigate(['/' + AppRoute.PRODUCT_DETAIL + '/' + productId]);
  }

  public navigateBack(): void {
    this.location.back();
  }
}

enum PRODUCT_COLUMN {
  ID = 'id',
  NAME = 'name',
  CATEGORY = 'category',
  UNIT = 'unit',
  PACKAGE_SIZE = 'packageSize',
  KCAL = 'kcal',
  CARBOHYDRATES = 'carbohydrates',
  PROTEIN = 'protein',
  FAT = 'fat',
  ACTIONS = 'actions'
}
