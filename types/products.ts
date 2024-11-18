export interface Product {
  id: string;
  asin: string;
  title: string;
  description: string;
  price: number | string;
  reviews: number;
  rating: number;
  image: string;
  category: string;
}
