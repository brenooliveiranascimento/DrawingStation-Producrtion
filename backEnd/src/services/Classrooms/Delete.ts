import statusCodes from "../../statusCode";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import Classroom from "./Classroom";
import ClassroomModel from "../../database/models/ClassroomModel";

export default class Delete extends Classroom {
  constructor() { super() }

  public async deleteClassroom(id: number) {
    try {
      const classroom = await this.findClassroomById(id);
      if(classroom) throw new CustomError(errorMapTypes.CLASSROOM_DONT_EXIST, statusCodes.NOT_FOUND);

      await ClassroomModel.destroy({where: { id }});

      return { message: 'Aula Deletada com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}