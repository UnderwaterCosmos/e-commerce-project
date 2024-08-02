import { ISingleProduct } from '../types/products';
import { RegistrationBasis, LoginBasis } from './forms';
import { ISelect } from './filters';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  confirmPassword?: string;
  login: string;
  avatarUrl: string;
  type?: ISelect;
	accType?: string;
  cart: ISingleProduct[];
  ordersHistory: {
    [key: string]: ISingleProduct[];
  };
}

export interface IUserState {
  isLoading: boolean;
  fullUserInfo: IUser | null;
  registrationBasis: RegistrationBasis;
  loginBasis: LoginBasis;
}
