export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?:number;
}

export interface ICategory {
  id: number;
  name: string;
}