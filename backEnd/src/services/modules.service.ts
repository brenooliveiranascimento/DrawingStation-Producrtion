import ModuleModel from '../database/models/ModuleModel'
import SubModuleModel from '../database/models/SubModuleModel';
import ClassroomModel from '../database/models/ClassroomModel';
class ModuleService {

  public async getAll() {
    const allModules = await SubModuleModel.findAll(
      {include: [
        {
          model: ClassroomModel,
          as: 'classrooms',
        },
      ],
      }
    );
    return allModules;
  }

}

export default ModuleService;
