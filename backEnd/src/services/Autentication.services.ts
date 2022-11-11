import UserModel from '../database/models/UserModel';
import { LoginResponse, UserCredentials, UserGoogleCredentials, UserInterface, UserVerifyInterface } from '../interfaces/userTypes';
import { hash, compare } from 'bcryptjs'
import { errorMapTypes } from '../utils/errorMap';
class AutenticationServices {

  async findAUser(email: string) {
    try {
      const findUser = await UserModel.findOne({
        where: { email }
      })
      if(!findUser) return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null }
      return { error: null, message: findUser }
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: null }
    }
  }

  public async register(user: UserCredentials): Promise<LoginResponse> {
    try {
      const { error, message: userExist } = await this.findAUser(user.email);
      
      if(userExist) return { error: { message: errorMapTypes.USER_ALREDY_EXISTS }, message: null };
      if(error && error.message !== errorMapTypes.USER_DONT_EXIST) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: null };
      const encriptedPassword = await hash(user.password, 8)
  
      const createNewUser = await UserModel.create({
        ...user,
        password: encriptedPassword,
        loginType: 'credential',
        profilePhoto: null,
      });
      return { error: null, message: createNewUser }
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: errorMapTypes.REQUEST_ERROR }
    }
  }

  public async login(userCredential: UserCredentials): Promise<LoginResponse> {
    const { email, password } = userCredential;
    const { error, message: userData } = await this.findAUser(email);

    if(error) {
       return { error: { message: error.message }, message: null };
    }

    const checkPassword = await compare(password, userData.password)

    if(!checkPassword) {
      return {error: { message: errorMapTypes.INCORRECT_PASSWORD },  message: null};
    }
    return { error: null, message: userData, type: 'Login' }
  }

  public async registerByGoogle(user: UserGoogleCredentials): Promise<LoginResponse> {
    try {
      const { email, sub: password, picture, name } = user;
      const encriptedPassword = await hash(password, 8)
  
      const createNewUser = await UserModel.create({ 
        email,
        name,
        password: encriptedPassword,
        loginType: 'google',
        profilePhoto: picture,
        birthday: null,
        phoneNumber: null
       });
  
       return { error: null, message: createNewUser.id, type: 'Register' }
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: errorMapTypes.REQUEST_ERROR }
    }
  };

  public async authByGoogle(user: UserGoogleCredentials): Promise<LoginResponse> {
    const { email, sub: password } = user;
    const { error, message: userData } = await this.findAUser(email);

    if(!userData && error.message !== errorMapTypes.REQUEST_ERROR) {
       return this.registerByGoogle(user)
    }

    if(error) {
      return { error: { message: error.message }, message: null };
   }

   const checkPassword = await compare(password, userData.password)

   if(!checkPassword) {
     return {error: { message: errorMapTypes.INCORRECT_PASSWORD },  message: null};
   }
   return { error: null, message: userData, type: 'Login' }
  }
};

export default AutenticationServices;
