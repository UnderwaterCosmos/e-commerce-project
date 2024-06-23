export interface ISingleProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

export interface IGetProductsConfig {
  _page: number;
  category: string;
  replace: boolean;
}
