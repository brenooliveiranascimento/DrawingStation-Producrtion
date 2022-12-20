import AuthValidationModel from "../../database/models/AuthValidationModel";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from 'jsonwebtoken';

export default class CodeValidate {
  private async validateToken(token: string, code: number) {
    const key = process.env.SECRET as string
  
    if (!token) throw new CustomError(errorMapTypes.TOKEN_NOT_FOUND, statusCodes.UNAUTHORIZED);
    try {
      jwt.verify(token, key);
      return true
    } catch (err) {
      await AuthValidationModel.destroy({ where: { code } });
      throw new CustomError(errorMapTypes.TOKEN_EXPIRED, statusCodes.BAD_REQUEST);
    }
  };

  async execute(code: number, token: string) {
    await this.validateToken(token, code);
    const { email } = jwt.decode(token) as any;
    const validateCode = await AuthValidationModel.findOne({ where: { email } });
    if(token !== validateCode?.token) throw new CustomError('Código expirado', statusCodes.UNAUTHORIZED);
    if(!validateCode) throw new CustomError('Código invádido', statusCodes.UNAUTHORIZED);
    if(validateCode.code !== code) throw new CustomError('Código invádido', statusCodes.UNAUTHORIZED);
    await AuthValidationModel.destroy({ where: { code } });
    return true
  }
}