import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import Classroom from "./Classroom";
import ClassroomModel from "../../database/models/ClassroomModel";
import { messageMap } from "../../utils/messageMap";

export default class Delete extends Classroom {
  constructor() { super() }

  public async execute(id: number) {
    try {
      await this.findById(id);
      const deleteClassroom = await ClassroomModel.destroy({where: { id }});
      if(!deleteClassroom) throw new CustomError(errorMapTypes.ERROR_IN_DELETE_CLASSROOM, statusCodes.NOT_FOUND);
      return { message: messageMap.CLASSROM_DELETED_SUCCESSFULLY };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}