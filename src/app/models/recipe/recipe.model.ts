export interface RecipeModel {
  id?: number;
  name?: string;
  category?: string;
  duration?: number;
  description?: string;
  kcal?: number;
  carbohydrates?: number;
  protein?: number;
  fat?: number;
  items?: RecipeItemModel[];
}

export interface RecipeItemModel {
  productId?: number;
  productName?: string;
  count?: number;
  unit?: string;
  description?: string;
}
