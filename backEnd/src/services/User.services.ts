import UserModel from '../database/models/UserModel';
import { GetUserInterface, UserInterface } from '../interfaces/userTypes';
import { errorMapTypes } from '../utils/errorMap';

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
}

export default UserService;
