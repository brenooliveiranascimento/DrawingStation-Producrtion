import Modules from "./Modules"
import ModuleModel from "../../database/models/ModuleModel";
import CustomError from "../../utils/StatusError";
import { errorMapTypes } from "../../utils/errorMap";
import statusCodes from "../../statusCode";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";

export default class Delete extends Modules {
  constructor() { super() };

  public async deleteModule(id: number):  Promise<ICommentGenericReturn> {
    try {
      const checkModuleExists = await this.getById(id);
      if(checkModuleExists) throw new CustomError(errorMapTypes.MODULE_NOT_FOUD, statusCodes.NOT_FOUND);
  
      const removeModule = await ModuleModel.destroy({ where: { id } })
  
      if(removeModule) throw new CustomError(errorMapTypes.ERROR_IN_DELETE_MODULE, statusCodes.NO_CONTENT);
  
      return { message: 'Módulo deletado com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}