import UserModel from '../database/models/UserModel';
import { UserCredentials, UserInterface } from '../interfaces/userTypes';
import { hash, compare } from 'bcryptjs'
class AutenticationServices {

  async userExist(email: string) {
    const userExist = await UserModel.findOne({
      where: { email }
    })
    return userExist;
  }

  async validatePassword(password: string, hash: string):Promise<boolean> {
    return await compare(password, hash);
  }

  public async register(user: UserCredentials) {
    const checkUserExist = await this.userExist(user.email);
    if(checkUserExist) return { error: { message: 'User alredy Exist' }, message: 'USER_ALREDY_EXISTS' };
    const encriptedPassword = await hash(user.password, 8)

    const createNewUser = await UserModel.create({ ...user,password: encriptedPassword });
    return { error: null, message: createNewUser }
  }

  public async login(userCredential: UserCredentials) {
    const {email, password} = userCredential;
    const userData = await this.userExist(email);

    if(!userData) return { error: { message: 'User dont exist' }, message: 'USER_ALREDY_EXISTS' };

    if(!this.validatePassword(password, userData.password)) {
      return {error: { message: 'password incorrect' },  message: 'INCORRECT_PASSWORD'};
    }

    return { error: null, message: email }
  }
};

export default AutenticationServices;
