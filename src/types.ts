
export interface ProductImage {
    id: string;
    url: string;
  }
  
  export interface ProductItem {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    image?: ProductImage;
  }
  
  export interface Category {
    id: string;
    name: string;
    products?: ProductItem[];
    [key: string]: unknown;
  }