import ModuleModel from "../../database/models/ModuleModel";
import { ModuleInterface } from "../../interfaces/modulesTypes";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class Create {
  public async execute(module: ModuleInterface):  Promise<ModuleInterface> {
    try {
      const createModule = await ModuleModel.create({ ...module })
      return createModule
    } catch (e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}