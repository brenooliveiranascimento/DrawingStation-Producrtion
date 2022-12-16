import UserModel from '../database/models/UserModel';
import AdmModel from '../database/models/AdmModel';
import { GetUserInterface, UserInterface } from '../interfaces/userTypes';
import { errorMapTypes } from '../utils/errorMap';
import CustomError from '../utils/StatusError';

class UserService {
  public async findUserById(id: number):Promise<GetUserInterface> {
    try {
      const user = await UserModel.findOne({ where: { id }, attributes: {
        exclude: ["password"]
      }});
  
      if(!user) return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null };
      return { error: null, message: user }
    } catch(e) {
       return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async findAdm(email: string):Promise<GetUserInterface> {
    try {
      const user = await AdmModel.findOne({ where: { email }});
      if(!user) return { error: { message: errorMapTypes.ADM_NOT_DOUND }, message: errorMapTypes.ADM_NOT_DOUND };
      return { error: null, message: user }
    } catch(e) {
       return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async getAllUsers() {
    try {
      const users = await UserModel.findAll({
        attributes: {exclude: ['password']}})
      if(!users) return { error: {message: errorMapTypes.REQUEST_ERROR}, message: null }
      return { error: null, message: users };
    } catch(e) {
       return { error: {message: errorMapTypes.REQUEST_ERROR}, message: e }
    }
  }

  async removePremium(id: number) {
    try {
      await UserModel.update(
        { premium: false },
        { where: { id } })
    } catch(e: any) {
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 500)
    }
  }
}

export default UserService;
