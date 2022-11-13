/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterCredentialInterface, SiginCredentialInterface } from '../interfaces/creadentialValidation';
const MIN_CHARACTERS = 6;
const regex = /\S+@\S+\.\S+/;

export const emailVerification = (email: string) => regex.test(email);

export const passwordVerification = (password: string) => password.length >= MIN_CHARACTERS;


export const creadentialSiginValidation = (credentials: SiginCredentialInterface | any) => {
  const credentialsKeys = Object.keys(credentials);
  let unknowCredential = '';

  const checkAllCredentials = credentialsKeys.every((credentialKey: string) => {
    if(credentialKey === 'email') {
      if(emailVerification(credentials[credentialKey])) {
        return true;
      } else {
        unknowCredential = 'email';
        return false;
      }
    }
    if(credentialKey === 'password') {
      if(passwordVerification(credentials[credentialKey])) {
        return true;
      } else {
        unknowCredential = 'password';
        return false;
      }
    }
    return true;
  });

  return { check: checkAllCredentials, unknowCredential };
};

export const creadentialRegisterValidation = (credentials: RegisterCredentialInterface | any) => {
  const credentialsKeys = Object.keys(credentials);
  let unknowCredential = '';
  const checkAllCredentials = credentialsKeys.every((credentialKey: string) => {
    if(credentials[credentialKey]) {
      return true;
    }
    unknowCredential = credentialKey;
    return false;
  });
  if(credentials.password === credentials.confirmPassword && checkAllCredentials) {
    return { check: true, unknowCredential };
  }

  return { check: false, unknowCredential };
};