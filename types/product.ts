export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  origin?: string;
  unit?: string;
}
