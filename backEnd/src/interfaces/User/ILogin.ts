import Users from "../../database/models/UserModel";

export interface IUser {
  id: number;
  name: string
  email: string;
  active: boolean;
  premium: boolean;
  birthday: string;
  phoneNumber: string;
}

export interface ILogin {
  message: Users
}