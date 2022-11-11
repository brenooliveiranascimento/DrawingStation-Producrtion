/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInterface {
  id: number;
  name: string
  email: string;
  active: boolean;
  premium: boolean;
  birthday: string;
  phoneNumber: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserGoogleCredentials {
  email: string,
  sub: string,
  name: string,
  picture: string,
  phoneNumber: string
}

export interface LoginResponse {
  error: null | { message: string };
  message: string | number | null;
  type?: string
}

export interface GetUserInterface {
  error: null | { message: string  | null },
  message: null | any
}

export interface RequestUserLoginResponse {
 message: string | null;
 token: string | null;
 error: { message: any } | null;
 email: string
}

export interface UserVerifyInterface {
  error: any | { message: string  | null },
  message: UserCredentials | any
}

export interface InitialValueState {
  userData: {
    name: string,
    uid: number | null,
    email: string,
    profilePhoto: string | null,
  };
  logged: boolean
  error: boolean;
  loginInit: boolean
}
