export class ProductSummaryModel {
  id?: number;
  name?: string;
  category?: string;
  unit?: string;
  packageSize?: number;

  public static shortString(obj: ProductSummaryModel): string {
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
