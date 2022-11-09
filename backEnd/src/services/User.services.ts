import UserModel from '../database/models/UserModel';
import { GetUserInterface, UserInterface } from '../interfaces/userTypes';
import { errorMapTypes } from '../utils/errorMap';

class UserService {
  public async findUserById(id: number):Promise<GetUserInterface> {
    const user = await UserModel.findOne({ where: { id }, attributes: {
      exclude: ["password"]
    }});

    if(!user) return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null };
    return { error: null, message: user }
  }
}

export default UserService;
