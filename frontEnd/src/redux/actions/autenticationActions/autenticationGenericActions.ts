import { UserInterface } from '../../../interfaces/UserInterfaces';
import { AuthTypes } from '../../Types/AuthTypes';

export const initAutentication = () => ({
  type: AuthTypes.INIT_LOGIN,
});

export const AutenticationSuccess = (userData: UserInterface) => ({
  type: AuthTypes.LOGIN_SUCCESS,
  payload: userData,
});

export const AutenticationFailure = () => ({
  type: AuthTypes.LOGIN_FAIL,
});

export const Sigout = () => ({
  type: AuthTypes.SIGOUT,
});
