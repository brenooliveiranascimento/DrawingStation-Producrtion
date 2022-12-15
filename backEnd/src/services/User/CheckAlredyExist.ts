import Users from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class CheckAlredyExist {
  async findAUser(email: string) {
    try {
      const user = await Users.findOne({ where: { email } });
      if(!user) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404);
      return user;
    } catch(e) {
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 404);
    }
  }
}