import { ISingleProduct } from '../types/products';
import { RegistrationBasis, LoginBasis } from './forms';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  login: string;
  avatarUrl: string;
  type: string;
  basket: ISingleProduct[];
}

export interface IUserState {
  isLoading: boolean;
  usersList: IUser[];
  authUser: Pick<IUser, 'login' | 'password' | 'id'> | null;
  registrationBasis: RegistrationBasis;
  loginBasis: LoginBasis;
}
