export interface CartModel {
  id?: number;
  name?: string;
  users?: string[];
  items?: CartItemModel[];
}

export interface CartItemModel {
  productId?: number;
  productName?: string;
  category?: string;
  packageSize?: number;
  count?: number;
  unit?: string;
  checked?: boolean;
  expanded?: boolean;
}
