export interface Product {
  id: string;
  asin: string;
  title: string;
  description: string;
  price: number | string;
  reviews: unknown[];
  category: string;
}
