import SubModuleModel from "../../database/models/SubModuleModel";
import ClassroomModel from "../../database/models/ClassroomModel";
import statusCodes from "../../statusCode";
import CustomError from "../../utils/StatusError";

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
}