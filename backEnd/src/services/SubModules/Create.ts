import { SubModulesInterface } from "../../interfaces/modulesTypes";
import SubModuleModel from "../../database/models/SubModuleModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import statusCodes from "../../statusCode";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";

export default class Create {
  public async execute(subModule: SubModulesInterface): Promise<ICommentGenericReturn> {
    try {
      const { description, id, image, moduleId, name, premium } = subModule;
      const createSubModule = await SubModuleModel.create({
        description, id, image, moduleId, name, premium
      })
      if(!createSubModule) throw new CustomError(errorMapTypes.SUBMODULE_DONT_CREATE, statusCodes.NOT_FOUND);
      return { message: 'SubModulo criado com sucesso!!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}