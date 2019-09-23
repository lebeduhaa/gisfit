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
  userId?: string;
  averageMassOfOnePiece?: number;
  weight?: number;
}
