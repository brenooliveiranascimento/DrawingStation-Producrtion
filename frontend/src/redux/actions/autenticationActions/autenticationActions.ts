/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { registerUserCredentials, RequestUserLoginResponse, UserCredentials } from '../../../interfaces/UserInterfaces';
import apiConnection from '../../../services/api.connection';
import { globalTypes } from '../../../utils/globalTypes';
import { setLocalStorage } from '../../../utils/localStorageManeger';

export const siginUser = (userCredentials: UserCredentials): any => {
  return  async (action: Dispatch<any>) => {
    try {
      const { email, password } = userCredentials;
      const { data } = await apiConnection.post('/auth/login', {
        email,
        password
      });
      const { error, message, name, id, token } = data;
      const userData = {name, email, id};

      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
      console.log(data);
  
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};

export const registerUser = (userCredentials: registerUserCredentials): any => {
  return  async (action: Dispatch<any>) => {
    try {
      const { email, password, name: userName, phoneNumber } = userCredentials;
      const { data } = await apiConnection.post('/auth/register', {
        name: userName,
        phoneNumber,
        email,
        password
      });
      const { error, message, name, id, token } = data;
      const userData = {name, email, id};
      console.log(data);
      setLocalStorage(globalTypes.DRAWING_USER_DATA, {...userData, token});
  
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};
