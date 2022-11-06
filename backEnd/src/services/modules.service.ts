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
          // include: [
          //   {
          //     model: ClassRoomDataModel,
          //     as: 'classrooms_data',
          //     // attributes: { exclude: ['classrooms_data'] }
          //   },
          // ]
        },
      ],
      }
    );
    return allModules;
  }

}

export default ModuleService;
