import { IAddNewProductImagesBasis } from './forms';
export interface ICategoriesElem {
  id?: number;
  name: string;
  displayName: string;
}

export interface IFiltersState {
  select: string;
  search: string;
  categoriesList: ICategoriesElem[];
  isLoading: boolean;
  newCategoryBasis: ICategoriesElem;
  newImagesObj: IAddNewProductImagesBasis;
}

export interface IFiltersData {
  key: 'select' | 'search';
  value: string;
}
