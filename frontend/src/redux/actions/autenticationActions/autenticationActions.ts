/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { RequestUserLoginResponse, UserCredentials } from '../../../interfaces/UserInterfaces';
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

      setLocalStorage(globalTypes.DRAWING_USER_DATA, {name, id, email, token});
  
    } catch(e: any) {
      console.log(e.response.data);
    }
  };
};
