export interface SiginCredentialInterface {
  email: string;
  password: string;
}

export interface RegisterCredentialInterface extends SiginCredentialInterface {
  confirmPassword: string;
  name: string;
  phoneNumber?: string;
}
