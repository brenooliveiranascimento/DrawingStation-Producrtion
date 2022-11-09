import ClassroomModel from '../database/models/ClassroomModel';
import SubModuleModel from '../database/models/SubModuleModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface } from '../interfaces/classroomsTypes';
import { errorMapTypes } from '../utils/errorMap';

class ModuleService {
  public async getAll() {
    const allModules = await SubModuleModel.findAll(
      {
        include: [
          {
            model: ClassroomModel,
            as: 'classrooms',
          //   order: ["id"],
          // include: [
          //   {
          //     model: ClassRoomDataModel,
          //     as: 'classrooms_data',
          //     where: { isPremium: false }
          //     // attributes: { exclude: ['classrooms_data'] }
          //   },
          // ]
          },
        ],
      },
    );
    return allModules;
  }

  public async findFreeClassroom(): Promise<{ error: {mesage: string} | null, message: ClassroomDataInterface[] | null }> {
    const freeClassRooms: ClassroomDataInterface[] = await ClassRoomDataModel.findAll({
      where: { isPremium: false },
    })
    if(!freeClassRooms) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    return { error: null, message: freeClassRooms }
  }

  public findAllClassroom() {

  }
  
}

export default ModuleService;
