import SubModuleModel from '../database/models/SubModuleModel';
import ClassroomModel from '../database/models/ClassroomModel';
class ModuleService {

  public async getAll() {
    const allModules = await SubModuleModel.findAll(
      {
      where: { premium: false },
        include: [
        {
          model: ClassroomModel,
          as: 'classrooms',
          order: ['id']
        },
      ],
      }
    );
    return allModules;
  }

}

export default ModuleService;
