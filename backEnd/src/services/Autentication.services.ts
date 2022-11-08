import UserModel from '../database/models/UserModel';
import { UserCredentials, UserInterface } from '../interfaces/userTypes';
import { hash, compare } from 'bcryptjs'
import { errorMapTypes } from '../utils/errorMap';
class AutenticationServices {

  async findAUser(email: string) {
    const findUser = await UserModel.findOne({
      where: { email }
    })
    return findUser;
  }

  public async register(user: UserCredentials) {
    const checkUserExist = await this.findAUser(user.email);
    if(checkUserExist) return { error: { message: errorMapTypes.USER_ALREDY_EXISTS }, message: null };
    const encriptedPassword = await hash(user.password, 8)

    const createNewUser = await UserModel.create({ ...user, password: encriptedPassword });
    return { error: null, message: createNewUser }
  }

  public async login(userCredential: UserCredentials) {
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
};

export default AutenticationServices;
