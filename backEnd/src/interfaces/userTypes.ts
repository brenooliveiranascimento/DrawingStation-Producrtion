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
