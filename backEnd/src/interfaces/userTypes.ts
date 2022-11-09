export interface UserInterface {
  id: number;
  name: string
  email: string;
  active: boolean;
  premium: boolean;
  birthday: string;
  phoneNumber: string;
}

export interface UserCredentials extends UserInterface {
  password: string;
};

export interface UserGoogleCredentials {
  email: string,
  sub: string,
  name: string,
  picture: string,
  phoneNumber: string
}

export interface LoginResponse {
  error: null | { message: string },
  message: string | number | null
}

export interface GetUserInterface {
  error: null | { message: string  | null },
  message: null | any
}
