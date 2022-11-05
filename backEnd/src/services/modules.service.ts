import ModuleModel from '../database/models/ModuleModel'

class ModuleService {

  public async getAll() {
    const allModules = await ModuleModel.findAll();
    return allModules;
  }

}

export default ModuleService;
