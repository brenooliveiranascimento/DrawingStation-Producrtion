import SubModuleModel from "../../database/models/SubModuleModel";
import ClassroomModel from "../../database/models/ClassroomModel";
import statusCodes from "../../statusCode";
import CustomError from "../../utils/StatusError";
import { errorMapTypes } from "../../utils/errorMap";

export default class SubModules {
  public async getAllSubModules() {
    try {
      const modules = await SubModuleModel.findAll(
        { include: [{ model: ClassroomModel, as: 'classrooms' }] });
      return modules;
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }

  public async findById(id: number) {
    try {
      const module = await SubModuleModel.findByPk(id)
      if(!module) throw new CustomError(errorMapTypes.SUBMODULE_DONT_EXIST, statusCodes.NOT_FOUND);
      return module
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}