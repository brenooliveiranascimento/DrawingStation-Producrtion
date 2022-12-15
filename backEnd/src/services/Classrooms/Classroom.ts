import ClassroomModel from "../../database/models/ClassroomModel";
import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class Classroom {
  public async findById(id: number): Promise<ClassroomModel> {
    try {
      const classroom = await ClassroomModel.findOne({where: { id }});
      if(!classroom) throw new CustomError(errorMapTypes.CLASSROOM_DONT_EXIST,statusCodes.NOT_FOUND);
      return classroom;
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  };
}