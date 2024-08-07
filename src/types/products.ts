import { IProductEditedValueBasis, IAddNewProductImagesBasis } from './forms';
import { ISelect } from './filters';

export interface ISingleProduct {
  id?: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category?: string;
  productGroup?: ISelect;
  images: string[];
}
export interface IGetProductsConfig {
  _page: number;
  category_like?: string;
  title_like?: string;
  replace?: boolean;
  preventRequest?: boolean;
}
export interface IProductsState {
  isLoading: boolean;
  productsList: ISingleProduct[];
  newProductBasis: ISingleProduct;
  totalPages: number;
}
export interface ISingleProductState {
  singleProduct: ISingleProduct | null;
  isLoading: boolean;
  isBackBtnPressed: boolean;
  editProductBasis: IProductEditedValueBasis;
  newImagesObj: IAddNewProductImagesBasis;
}

export const isSingleProduct = (
  arg: ISingleProduct | { index: number; quantity: number } | ISingleProduct[]
): arg is ISingleProduct => (arg as ISingleProduct).title !== undefined;

export const isSingleProductArray = (
  arg: ISingleProduct | { index: number; quantity: number } | ISingleProduct[]
): arg is ISingleProduct[] => (arg as ISingleProduct[]).length !== undefined;
