import UserModel from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from "jsonwebtoken";

export default class InitRecoverPassword {

  private createToken(email: string) {
    const key = process.env.SECRET as string
    const token = jwt.sign(email, key, { expiresIn: '1h' });
    return token;
  };

  async execute(email: string) {
    try { 
      const userExist = await UserModel.findOne({ where: { email } })
      if(!userExist) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 500);

      await UserModel.update({ recoverPassword: this.createToken(email) }, { where: { email } });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}