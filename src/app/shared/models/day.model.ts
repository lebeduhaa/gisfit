import { Product } from './product.model';

export interface Day {
  currentCalories?: number;
  currentProtein?: number;
  currentFats?: number;
  currentCarbohydrates?: number;
  products?: Product[];
}
