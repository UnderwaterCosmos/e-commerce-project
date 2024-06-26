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
  category_like: string;
  title_like: string;
  replace: boolean;
  preventRequest: boolean;
}
export interface IProductsState {
  isLoading: boolean;
  productsList: ISingleProduct[];
  totalPages: number;
}
