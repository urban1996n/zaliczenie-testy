export interface ProductComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  comments?: ProductComment[];
}
