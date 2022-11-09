import ClassroomModel from '../database/models/ClassroomModel';
import SubModuleModel from '../database/models/SubModuleModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';

class ModuleService {
  public async getAll() {
    const allModules = await SubModuleModel.findAll(
      {
        include: [
          {
            model: ClassroomModel,
            as: 'classrooms',
            order: ["id"],
          include: [
            {
              model: ClassRoomDataModel,
              as: 'classrooms_data',
              where: { isPremium: false }
              // attributes: { exclude: ['classrooms_data'] }
            },
          ]
          },
        ],
      },
    );
    return allModules;
  }

  public async findFreeClassroom() {
    const freeClassRooms = await ClassRoomDataModel.findAll({
      where: { isPremium: false },
    })
    return freeClassRooms
  }

  public findAllClassroom() {

  }
  
}

export default ModuleService;
