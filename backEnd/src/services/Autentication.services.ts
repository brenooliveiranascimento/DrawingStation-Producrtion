import UserModel from '../database/models/UserModel';
import { LoginResponse, UserCredentials, UserGoogleCredentials, UserInterface } from '../interfaces/userTypes';
import { hash, compare } from 'bcryptjs'
import { errorMapTypes } from '../utils/errorMap';
class AutenticationServices {

  async findAUser(email: string) {
    const findUser = await UserModel.findOne({
      where: { email }
    })
    return findUser;
  }

  public async register(user: UserCredentials): Promise<LoginResponse> {
    const checkUserExist = await this.findAUser(user.email);
    if(checkUserExist) return { error: { message: errorMapTypes.USER_ALREDY_EXISTS }, message: null };
    const encriptedPassword = await hash(user.password, 8)

    const createNewUser = await UserModel.create({
      ...user,
      password: encriptedPassword,
      loginType: 'credential',
      profilePhoto: null
    });
    return { error: null, message: user.email }
  }

  public async login(userCredential: UserCredentials): Promise<LoginResponse> {
    const { email, password } = userCredential;
    const userData = await this.findAUser(email);

    if(!userData) {
       return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null };
    } 
    const checkPassword = await compare(password, userData.password)

    if(!checkPassword) {
      return {error: { message: errorMapTypes.INCORRECT_PASSWORD },  message: null};
    }
    return { error: null, message: email }
  }

  public async registerByGoogle(user: UserGoogleCredentials): Promise<LoginResponse> {
    const { email, sub: password, picture } = user;
    const encriptedPassword = await hash(password, 8)

    const createNewUser = await UserModel.create({ 
      password: encriptedPassword,
      loginType: 'google',
      profilePhoto: picture
     });

     return { error: null, message: email }
  };

  public async authByGoogle(user: UserGoogleCredentials): Promise<LoginResponse> {
    const { email, sub: password } = user;
    const userData = await this.findAUser(email);

    if(!userData) {
       return this.registerByGoogle(user)
    } 
    const checkPassword = await compare(password, userData.password)

    if(!checkPassword) {
      return {error: { message: errorMapTypes.INCORRECT_PASSWORD },  message: null};
    }
    return { error: null, message: email }
  }
};

export default AutenticationServices;
