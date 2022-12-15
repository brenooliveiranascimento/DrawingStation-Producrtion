import ModuleModel from "../../database/models/ModuleModel";
import { ModuleInterface } from "../../interfaces/modulesTypes";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class Modules {

  public async getById(id: number):  Promise<ModuleModel> {
    try {
      const modules = await ModuleModel.findOne({ where: { id } });
      if(!modules) throw new CustomError(errorMapTypes.MODULE_NOT_FOUD, statusCodes.NOT_FOUND);

      return modules;
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST)
    }
  }

  public async getAll():  Promise<ModuleInterface[]> {
    try {
      const modules = await ModuleModel.findAll();
      return modules
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST)
    }
  }
}