import { hash } from "bcryptjs";
import Users from "../../database/models/UserModel";
import { LoginResponse, UserCredentials } from "../../interfaces/userTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class Register {

  async findAUser(email: string) {
    try {
      const user = await Users.findOne({ where: { email } });
      if(!user) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404);
      return user;
    } catch(e) {
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 404);
    }
  }

  public async execute(user: UserCredentials) {
    try {
      const checkUserExist = await this.findAUser(user.email);
      
      if(checkUserExist) return { error: { message: errorMapTypes.USER_ALREDY_EXISTS }, message: null };
      const encriptedPassword = await hash(user.password, 8)
  
      await Users.create({
        ...user, password: encriptedPassword,
        loginType: 'credential', profilePhoto: null,
      });

      return { message: 'User criado com sucesso!!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

}