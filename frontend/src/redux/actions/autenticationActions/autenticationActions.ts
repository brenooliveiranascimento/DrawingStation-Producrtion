/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { registerUserCredentials, UserCredentials } from '../../../interfaces/UserInterfaces';
import apiConnection from '../../../services/api.connection';
import { globalTypes } from '../../../utils/globalTypes';
import { setLocalStorage } from '../../../utils/localStorageManeger';
import { AutenticationSuccess, initAutentication } from './autenticationGenericActions';

export const siginUser = (userCredentials: UserCredentials): any => {
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
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};

export const registerUser = (userCredentials: registerUserCredentials): any => {
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
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};

export const loginWithGoogle = (userCredentials: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { name, id, token, email, profilePhoto } = userCredentials;
      const userData = {name, email, id, profilePhoto};
      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
      dispatch(AutenticationSuccess(userData));
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};
