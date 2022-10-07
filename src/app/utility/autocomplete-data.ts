import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ProductModel} from "../models/product.model";

export class AutoComplete {
  input: string = '';
  options: string[] = [];
  readonly inputControl = new FormControl();
  readonly filteredOptions: Observable<string[]> = this.inputControl.valueChanges.pipe(
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
  options: ProductModel[] = [];
  readonly inputControl = new FormControl();
  readonly filteredOptions: Observable<ProductModel[]> = this.inputControl.valueChanges.pipe(
    startWith(''),
    map(value => this.options.filter((option) => ProductModel.shortString(option).toLowerCase().includes(value.toLowerCase())))
  );

  public reset(): void {
    this.input = '';
    this.options = [];
  }
}

