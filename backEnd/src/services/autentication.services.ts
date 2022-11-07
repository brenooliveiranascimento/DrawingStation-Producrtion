import UserModel from '../database/models/UserModel';
import { UserCredentials, UserInterface } from '../interfaces/userTypes';
import { hash } from 'bcryptjs'
class AutenticationServices {

  async userExist(email: string) {
    const userExist = await UserModel.findOne({
      where: { email }
    })
    return userExist;
  }

  public async register(user: UserCredentials) {
    const checkUserExist = await this.userExist(user.email);
    if(checkUserExist) return { error: { message: 'User alredtExist' }, message: 'USER_ALREDY_EXISTS' };

    const encriptedPassword = hash(user.password, 8)
    console.log(encriptedPassword);

    const createNewUser = await UserModel.create({...user});
    return { error: null, message: createNewUser }
  }

  public async login() {

  }
};

export default AutenticationServices;
