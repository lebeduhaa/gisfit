import { Product } from './product.model';

export interface CurrentEat {
  weight?: boolean;
  howMuch?: number;
  product?: Product;
}
