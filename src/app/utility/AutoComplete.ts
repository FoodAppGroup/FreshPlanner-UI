import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ProductSummaryModel} from "../models/product/product-summary.model";

export class AutoComplete {
  input: string = '';
  options: string[] = [];
  inputControl = new FormControl();
  filteredOptions: Observable<string[]> = this.inputControl.valueChanges.pipe(
    startWith(''),
    map(value => this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()))),
  );

  public reset(): void {
    this.input = '';
    this.options = [];
  }
}

export class ProductAutoComplete {
  input: string = '';
  options: ProductSummaryModel[] = [];
  inputControl = new FormControl();
  filteredOptions: Observable<ProductSummaryModel[]> = this.inputControl.valueChanges.pipe(
    startWith(''),
    map(value => this.options.filter((option) => ProductSummaryModel.shortString(option).toLowerCase().includes(value.toLowerCase())))
  );

  public reset(): void {
    this.input = '';
    this.options = [];
  }
}

