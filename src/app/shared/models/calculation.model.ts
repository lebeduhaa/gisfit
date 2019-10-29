import { Product } from './product.model';

export interface Calculation {
  caloriesPer100Gram?: number;
  proteinPer100Gram?: number;
  fatsPer100Gram?: number;
  carbohydratesPer100Gram?: number;
  totalWeight?: number;
  products?: Product[];
}

export interface TotalCalculation {
  totalCalories?: number;
  totalProtein?: number;
  totalFats?: number;
  totalCarbohydrates?: number;
  totalWeight?: number;
}
