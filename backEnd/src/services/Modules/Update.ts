import { ICommentGenericReturn } from "../../interfaces/commentsTypes";
import { ModuleInterface } from "../../interfaces/modulesTypes";
import Modules from "./Modules";
import ModuleModel from "../../database/models/ModuleModel";
import CustomError from "../../utils/StatusError";
import { errorMapTypes } from "../../utils/errorMap";
import statusCodes from "../../statusCode";

export default class Update extends Modules {
  constructor() { super() };

  public async execute(id: number, newModule: ModuleInterface):  Promise<ICommentGenericReturn> {
    try {
      const { image, name, premium, description } = newModule;
      await this.getById(id);
  
      const update = await ModuleModel.update(
        { image, name, premium, description },
        { where: { id } })
  
      if(!update) throw new CustomError(errorMapTypes.ERROR_IN_DELETE_MODULE, statusCodes.NOT_FOUND);
  
      return { message: 'Módulo Atualizado com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}