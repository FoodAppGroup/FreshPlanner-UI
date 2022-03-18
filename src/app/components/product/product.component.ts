import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ProductModel} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpenSnackBar} from "../../utility/SnackBar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Log} from "../../utility/Log";
import {Location} from "@angular/common";

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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  data: ProductModel[] = [];
  dataSource = new MatTableDataSource<ProductModel>();
  tableModel = new ProductTableModel();
  expandedElement: ProductModel | undefined;

  constructor(private productService: ProductService,
              private snackBar: MatSnackBar,
              private location: Location) {
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.dataSource.data = this.data;
  }

  public ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private loadAllProducts(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.data = response;
      this.dataSource.data = this.data;
      Log.info('My object', response)
      OpenSnackBar(this.snackBar, 'Loaded all Products.');
    });
  }

  public navigateBack(): void {
    this.location.back();
  }
}

enum PRODUCT_COLUMN {
  ID = 'id',
  NAME = 'name'
}

class ProductTableModel {
  displayedColumns = [
    PRODUCT_COLUMN.ID,
    PRODUCT_COLUMN.NAME
  ];
  columns = {
    id: {
      key: PRODUCT_COLUMN.ID,
      label: 'ID',
      tooltip: 'Product ID'
    },
    name: {
      key: PRODUCT_COLUMN.NAME,
      label: 'Name',
      tooltip: 'Product Name'
    }
  };
}
