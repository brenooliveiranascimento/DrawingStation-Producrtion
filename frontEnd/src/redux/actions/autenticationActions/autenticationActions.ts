/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { registerUserCredentials, UserCredentials } from '../../../interfaces/UserInterfaces';
import { apiConnection } from '../../../services/api.connection';
import { globalTypes } from '../../../utils/globalTypes';
import { AutenticationFailure, AutenticationSuccess, initAutentication, Sigout } from './autenticationGenericActions';
import { toast } from 'react-toastify';
import nookies, { destroyCookie } from 'nookies';
import { genericCommentAciton } from '../commentsActions/genericAtions';

export const siginUser = (userCredentials: UserCredentials, redirect: any, path: string): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { email, password } = userCredentials;
      const { data } = await apiConnection.post('/auth/login', {
        email,
        password
      });
      const { name, id, token, profilePhoto, birthday, phoneNumber, premium, stripeClientId, oldAss } = data;
      const userData = {name, email, id, profilePhoto, birthday, phoneNumber, premium, stripeClientId};

      dispatch(AutenticationSuccess(userData));
      toast.success(`Seja bem vindo ${name}`);
      nookies.set(null, globalTypes.DRAWING_USER_DATA, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      dispatch(genericCommentAciton('OLD_ASS', oldAss || false));
      console.log(data);
      redirect(path);
    } catch(e: any) {
      if(e) {
        console.log(e);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log(e);
        toast.error('Server Connectionn error');
      }
      dispatch(AutenticationFailure());
    }
  };
};

export const registerUser = (userCredentials: registerUserCredentials, redirect: any, path: string): any => {
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
      const { name, id, token, profilePhoto, birthday } = data;
      const userData = {name: userName, email, id, profilePhoto, birthday, phoneNumber, premium: false};
      nookies.set(null, globalTypes.DRAWING_USER_DATA, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      destroyCookie(null, globalTypes.DRAWING_VERIFICATION_TOKEN);
      dispatch(AutenticationSuccess(userData));
      redirect(path);
      toast.success(`Seja bem vindo ${name}`);
    } catch(e: any) {
      if(e) {
        console.log(e);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log(e);
        toast.error('Server Connectionn error');
      }
      dispatch(AutenticationFailure());
    }
  };
};

export const loginWithGoogle = (userCredentials: any, redirect: any, path: string): any => {
  return  async (dispatch: Dispatch<any>) => {
    dispatch(initAutentication());
    try {
      const { name, id, token, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId, oldAss } = userCredentials;

      const userData = {
        name, email, id, profilePhoto, birthday, phoneNumber, premium: premium === undefined ? false : premium, stripeClientId};
      nookies.set(null, globalTypes.DRAWING_USER_DATA, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      console.log(userCredentials);
      dispatch(genericCommentAciton('OLD_ASS', oldAss || false));
      dispatch(AutenticationSuccess(userData));
      redirect(path);
      toast.success(`Seja bem vindo ${name}`);
    } catch(e: any) {
      if(e) {
        console.log(e.response.data);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log(e);
        toast.error('Server Connectionn error');
      }
      dispatch(AutenticationFailure());
    }
  };
};

export const validateUser = (redirect: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    const token = JSON.stringify(nookies.get(null, globalTypes.DRAWING_USER_DATA));
    if(!token) return;
    try {
      const { data } = await apiConnection.post('/auth/me', null, {
        headers: {
          'Authorization': token
        }
      });
      const {name, email, id, profilePhoto, birthday, phoneNumber, premium, stripeClientId} = data.message;

      const userData = {name, email, id, profilePhoto, birthday, phoneNumber, premium, stripeClientId};
      dispatch(AutenticationSuccess(userData));
      redirect('/dashboard');
    } catch(e: any) {
      if(e) {
        console.log(e.response.data);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log(e);
        toast.error('Server Connectionn error');
      }
      dispatch(logout(redirect));
      dispatch(AutenticationFailure());
    }
  };
};

export const logout = (redirect: any): any => {
  return  async (dispatch: Dispatch<any>) => {
    nookies.destroy(null, globalTypes.DRAWING_USER_DATA);
    dispatch(Sigout());
    redirect('/');
    toast.info('Deslogado com sucesso!');
  };
};