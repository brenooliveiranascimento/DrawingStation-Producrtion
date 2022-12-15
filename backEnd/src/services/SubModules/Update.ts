import SubModules from "./SubModules";
import { SubModulesInterface } from "../../interfaces/modulesTypes";
import SubModuleModel from "../../database/models/SubModuleModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import statusCodes from "../../statusCode";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";

export default class Update extends SubModules {
  constructor() { super() };

  public async execute(
    id: number, subModuleData: SubModulesInterface
    ): Promise<ICommentGenericReturn> {
    try {
      const { description, image, name, premium } = subModuleData;
      await this.findById(id);

      const updatedSubModule = await SubModuleModel.update(
        { description, image, premium, name },
        { where: { id } })
      if(!updatedSubModule) throw new CustomError(errorMapTypes.ERROR_IN_UPDATE_SUBMODULE, statusCodes.NOT_FOUND);

      return { message: 'SubModule updated success' }
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}