import SubModules from "./SubModules";
import { SubModulesInterface } from "../../interfaces/modulesTypes";
import SubModuleModel from "../../database/models/SubModuleModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import statusCodes from "../../statusCode";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";

export default class Delete extends SubModules {
  constructor() { super() };

  public async execute(id: number):  Promise<ICommentGenericReturn> {
    try {
      await this.findById(id);
  
      const removeModule = await SubModuleModel.destroy({ where: { id } })
      if(!removeModule) throw new CustomError(errorMapTypes.ERROR_IN_DELETE_MODULE, statusCodes.NOT_FOUND)
  
      return { message: 'SubMódulo deletado com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}