export interface ICategoriesElem {
  id?: number;
  value: string;
  label: string;
}

export interface ISelect {
  value: string;
  label: string;
}

export interface IFiltersState {
  select: ISelect;
  search: string;
  categoriesList: ICategoriesElem[];
  isLoading: boolean;
  newCategoryBasis: ICategoriesElem;
}
