import UserModel from "../../database/models/UserModel";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from 'jsonwebtoken';
import { hash } from "bcryptjs";

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

  async execute(token: string, code: number, newPassword: string) {
    const { email } = jwt.decode(token) as any;
    await this.validateToken(token, email);
    try {
      const user = await UserModel.findOne({ where: { email } });
      if(code === user?.recoverPasswordCode) {
        const encriptedPassword = await hash(newPassword, 8)
  
        await UserModel.update(
          {recoverPasswordCode: null, recoverPasswordtoken: null, password: encriptedPassword},
          { where: { email } });
        return 'Senha atualizada com sucesso!'
      }
      throw new CustomError("Código inválido", 500);
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}