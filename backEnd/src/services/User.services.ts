import UserModel from '../database/models/UserModel';
import { errorMapTypes } from '../utils/errorMap';

class UserService {
  public async findUserById(id: number) {
    const user = await UserModel.findOne({ where: { id }, attributes: {
      exclude: ["password"]
    }});

    if(!user) return { error: { message: errorMapTypes.USER_DONT_EXIST }, message: null };
    return user
  }
}

export default UserService;
