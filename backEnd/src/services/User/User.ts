import Users from "../../database/models/UserModel"
import { errorMapTypes } from "../../utils/errorMap"
import CustomError from "../../utils/StatusError"

export default class User {
  async getByEmail(email: string) {
    try {
      const findUser = await Users.findOne({ where: { email } });
      if(!findUser) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404);
      return findUser;
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}