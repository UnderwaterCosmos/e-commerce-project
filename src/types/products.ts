export interface ISingleProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  categoryRus: string;
  images: string[];
}

export interface IGetProductsConfig {
  _page?: number;
  q?: string;
  category?: string;
  replace?: boolean;
	title_like?: string;
}
