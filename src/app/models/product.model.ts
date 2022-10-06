export class ProductModel {
  id?: number;
  name?: string;
  category?: string;
  unit?: string;
  packageSize?: number;
  kcal?: number;
  carbohydrates?: number;
  protein?: number;
  fat?: number;

  public static shortString(obj: ProductModel): string {
    let string: string = '';
    if (obj?.name) {
      string += obj.name;
    } else {
      string += obj.id;
    }
    if (obj?.category) {
      string += ' (' + obj.category + ')';
    }
    return string;
  }
}
