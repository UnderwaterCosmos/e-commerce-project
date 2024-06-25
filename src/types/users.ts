import { ISingleProduct } from '../types/products';

export interface IUser {
  email: string;
  password: string;
  login: string;
  avatarUrl: string;
  type: string;
  id: string;
  basket: ISingleProduct[];
}

export type IUserBasis = Omit<IUser, 'basket' | 'id'>;

export interface IUserState {
  isLoading: boolean;
  usersList: IUser[];
  userBasis: IUserBasis;
}
