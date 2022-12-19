import UserModel from "../../database/models/UserModel";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from 'jsonwebtoken';

export default class ValidateRecoverPasswordCode {
  private async validateToken(token: string, email: string) {
    const key = process.env.SECRET as string
  
    if (!token) throw new CustomError(errorMapTypes.TOKEN_NOT_FOUND, statusCodes.UNAUTHORIZED);
    try {
      jwt.verify(token, key);
      return true
    } catch (err) {
      UserModel.update({ recoverPassword: null }, { where: { email } });
      throw new CustomError(errorMapTypes.TOKEN_EXPIRED, statusCodes.BAD_REQUEST);
    }
  };

  async execute(token: string, code: number) {
    const { email } = jwt.decode(token) as any;
    this.validateToken(token, email);

    const user = await UserModel.findOne({ where: { email } });

    if(code === user?.recoverPasswordCode) {
      await UserModel.update(
        {recoverPasswordCode: null, recoverPasswordtoken: null},
        { where: { email } });
    }
  }
}