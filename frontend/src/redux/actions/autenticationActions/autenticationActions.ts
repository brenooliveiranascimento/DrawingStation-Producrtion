/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { registerUserCredentials, UserCredentials } from '../../../interfaces/UserInterfaces';
import apiConnection from '../../../services/api.connection';
import { globalTypes } from '../../../utils/globalTypes';
import { setLocalStorage } from '../../../utils/localStorageManeger';
import { AutenticationFailure, AutenticationSuccess, initAutentication, Sigout } from './autenticationGenericActions';
import { toast } from 'react-toastify';

export const siginUser = (userCredentials: UserCredentials, redirect: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { email, password } = userCredentials;
      const { data } = await apiConnection.post('/auth/login', {
        email,
        password
      });
      const { name, id, token, profilePhoto } = data;
      const userData = {name, email, id, profilePhoto};

      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
      dispatch(AutenticationSuccess(userData));
      toast.success(`Seja bem vindo ${name}`);
      redirect();
    } catch(e: any) {
      console.log(e.response.data);
      toast.error(`${e.response.data.message}`);
      dispatch(AutenticationFailure());
    }
  };
};

export const registerUser = (userCredentials: registerUserCredentials, redirect: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { email, password, name: userName, phoneNumber } = userCredentials;
      const { data } = await apiConnection.post('/auth/register', {
        name: userName,
        phoneNumber,
        email,
        password
      });
      const { name, id, token, profilePhoto } = data;
      const userData = {name, email, id, profilePhoto};
      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
      dispatch(AutenticationSuccess(userData));
      redirect();
      toast.success(`Seja bem vindo ${name}`);
    } catch(e: any) {
      console.log(e.response.data);
      dispatch(AutenticationFailure());
      toast.error(`${e.response.data.message}`);
    }
  };
};

export const loginWithGoogle = (userCredentials: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { name, id, token, email, profilePhoto } = userCredentials;
      const userData = {name, email, id, profilePhoto};
      dispatch(AutenticationSuccess(userData));
      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
    } catch(e: any) {
      console.log(e.response.data);
      dispatch(AutenticationFailure());
      toast.error(`${e.response.data.message}`);
    }
  };
};

export const logout = (): any => {
  return  async (dispatch: Dispatch<any>) => {
    localStorage.removeItem(globalTypes.DRAWING_USER_DATA);
    dispatch(Sigout());
    toast.info('Deslogado com sucesso!');
  };
};
