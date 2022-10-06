export interface StorageModel {
  id?: number;
  name?: string;
  users?: string[];
  items?: StorageItemModel[];
}

export interface StorageItemModel {
  productId?: number;
  productName?: string;
  category?: string;
  packageSize?: number;
  count?: number;
  unit?: string;
}
