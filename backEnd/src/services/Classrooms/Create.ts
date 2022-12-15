import { ClassroomDataInterface, ClassroomInterface } from "../../interfaces/classroomsTypes";
import ClassroomModel from "../../database/models/ClassroomModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import ClassroomDataModel from "../../database/models/ClassRoomDataModel";
import statusCodes from "../../statusCode";

export default class Create {

  public async addNewClassroomData(classroomData: ClassroomDataInterface) {
    try {
      const add = await ClassroomDataModel.create({...classroomData});
      if(!add) throw new CustomError(errorMapTypes.ERROR_ADD_NEW_CLASSROOM_DATA, statusCodes.NO_CONTENT);
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }

  public async execute(newClassroom: ClassroomInterface, classroomData: ClassroomDataInterface) {
    try {
      const add = await ClassroomModel.create({...newClassroom});

      if(!add) throw new CustomError(errorMapTypes.ERROR_ADD_NEW_CLASSROOM, 500);
  
      await this.addNewClassroomData({ ...classroomData, classroomId: add.id })

      return { message: 'Aula adicionada com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, statusCodes.BAD_REQUEST);
    }
  }
}