import { Comment } from './comment.model';
import { User } from './user.model';

export interface Product {
  productName?: string;
  category?: string;
  calories?: number;
  protein?: number;
  fats?: number;
  carbohydrates?: number;
  image?: string | ArrayBuffer;
  fakeImage?: string;
  id?: string;
  averageMassOfOnePiece?: number;
  weight?: number;
  likes?: string[];
  comments?: Comment[];
  description?: string;
  ingredients?: string;
  recipe?: string;
  dish?: boolean;
  user?: User;
  amount?: number;
  popularity?: number;
}
