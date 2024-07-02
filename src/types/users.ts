import { ISingleProduct } from '../types/products';
import { RegistrationBasis, LoginBasis } from './forms';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  login: string;
  avatarUrl: string;
  type: string;
  cart: ISingleProduct[];
}

export interface IUserState {
  isLoading: boolean;
  fullUserInfo: IUser | null;
  authUserInfo: Pick<IUser, 'login' | 'password' | 'id'> | null;
  registrationBasis: RegistrationBasis;
  loginBasis: LoginBasis;
}
