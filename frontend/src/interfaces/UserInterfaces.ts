/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInterface {
  id?: number;
  name: string
  email: string;
  active?: boolean;
  premium?: boolean;
  birthday: string;
  profilePhoto?: string;
  loginType?: string;
  phoneNumber: any;
}

export interface UserCredentials {
  id?: number;
  email: string;
  password: string;
}

export interface registerUserCredentials extends UserCredentials {
  name: string;
  phoneNumber?: string
}

export interface UserState {
  name: string;
  id: number;
  email: string;
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

export interface UserInitialInterface {
    name: string,
    id: number | null,
    email: string,
    profilePhoto: string | null,
    birthday: null,
    premium?: boolean;
    phoneNumber: null,
}

export interface InitialValueState {
  usersControllData: UserInterface[] | any;
  userData: UserInitialInterface;
  logged: boolean
  error: boolean;
  loginInit: boolean
}
