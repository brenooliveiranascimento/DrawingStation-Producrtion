import AuthValidationModel from "../../database/models/AuthValidationModel";
import UsersModel from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from 'jsonwebtoken';

export default class InitAccountValidation {

  private createCode() {
    let code = '';
    for(let index = 1; index <= 5; index += 1) {
      const randomvalue = Math.floor(Math.random() * 10);
      code += randomvalue;
    }
    return Number(code);
  }

  async execute(email: string) {
    const user = await UsersModel.findOne({ where: { email } });
    if(user) throw new CustomError(errorMapTypes.USER_ALREDY_EXISTS, 401);

    const code = this.createCode();
    
    const key = process.env.SECRET as string
    const token = jwt.sign({ email }, key, { expiresIn: '1h' });

    try {
      await AuthValidationModel.create({ email, code });
      return token;
    } catch(e: any) {
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 500);
    }
  }
}