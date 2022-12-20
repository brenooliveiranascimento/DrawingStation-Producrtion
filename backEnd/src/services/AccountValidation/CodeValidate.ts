import AuthValidationModel from "../../database/models/AuthValidationModel";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class CodeValidate {
  async execute(code: number) {
    try {
      const validateCode = await AuthValidationModel.findOne({ where: { code } });
      if(!validateCode) throw new CustomError('Código invádido', statusCodes.UNAUTHORIZED);
      await AuthValidationModel.destroy({ where: { code } });
      return true
    } catch(e: any) {
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 500);
    }
  }
}