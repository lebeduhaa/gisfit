import { Product } from './product.model';

export interface History {
  caloriesGoal?: number;
  proteinGoal?: number;
  fatsGoal?: number;
  carbohydratesGoal?: number;
  resultCalories?: number;
  resultProtein?: number;
  resultFats?: number;
  resultCarbohydrates?: number;
  products?: Product[];
  totalScore?: number;
}
