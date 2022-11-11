import ClassroomModel from '../database/models/ClassroomModel';
import SubModuleModel from '../database/models/SubModuleModel';
import ModuleModel from '../database/models/ModuleModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface } from '../interfaces/classroomsTypes';
import { ModuleInterface, SubModulesInterface } from '../interfaces/modulesTypes';
import { errorMapTypes } from '../utils/errorMap';

class ModuleService {
  public async getAllSubModules() {
    const allModules = await SubModuleModel.findAll(
      {
        include: [
          {
            model: ClassroomModel,
            as: 'classrooms',
          },
        ],
      },
    );
    if(!allModules) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    return { error: null, message: allModules }
  }

  public async findASubModule(id: number) {
    try {
      const allModules = await SubModuleModel.findByPk(id)
      if(!allModules) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: errorMapTypes.SUBMODULE_DONT_EXIST }
      return { error: null, message: allModules }
    } catch(e) {
      return { error: { message: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: e }
    }
  }

  public async updateSubModule(id: number, subModuleData: SubModulesInterface) {
    try {
      const { description, image, name, premium } = subModuleData;
      const { error } = await this.findASubModule(id);
      if(error) return { error: { message: error.message }, message: null };

      const updatedSubModule = await SubModuleModel.update(
        { description, image, premium, name },
        { where: { id } }
      )
      if(!updatedSubModule) return { error: { mesage: errorMapTypes.ERROR_IN_UPDATE_SUBMODULE }, message: null }

      return { error: null, message: 'SubModule updated success' }
    } catch(e) {
      return { error: errorMapTypes.CLASSROOM_REQUEST_ERROR, message: e }
    }
  }

  public async updateModule(id: number, newModule: ModuleInterface):  Promise<{ error: {message: string} | null, message: string | null | any }> {
    try {
      const { image, name, premium, description } = newModule;
      const {error} = await this.getModuleById(id);
      if(error) return { error: { message: error.message }, message: null };
  
      const update = await ModuleModel.update(
        { image, name, premium, description },
        { where: { id } },
        )
  
      if(!update) return { error: { message: errorMapTypes.ERROR_IN_UPDATE_MODULE }, message: null };
  
      return { error: null, message: 'Módulo Atualizado com sucesso!' };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async getAllModules():  Promise<{ error: {message: string} | null, message: ModuleInterface[] | null | string }> {
    try {
      const modules = await ModuleModel.findAll();
      if(!modules) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: 'Not found modules' };
      return { error: null, message: modules };
    } catch(e: any) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async getModuleById(id: number):  Promise<{ error: {message: string} | null, message: ModuleInterface | null | string }> {
    try {
      const modules = await ModuleModel.findOne({ where: { id } });
      if(!modules) return { error: { message: errorMapTypes.SUBMODULE_DONT_EXIST }, message: errorMapTypes.SUBMODULE_DONT_EXIST };
      return { error: null, message: modules };
    } catch(e: any) {
      return { error: {message: errorMapTypes.REQUEST_ERROR}, message: e };
    }
  }


  public async addNewModule(module: ModuleInterface):  Promise<{ error: {message: string} | null, message: ModuleInterface | null }> {
    const add = await ModuleModel.create({
      ...module
    })
    if(!add) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: null };
    return { error: null, message: add };
  }

  public async deleteModule(id: number):  Promise<{ error: {message: string} | null, message: string | null | ModuleInterface | any}> {
    try {
      const { error, message } = await this.getModuleById(id);
      if(error) return { error: { message: error.message }, message: message };
  
      const removeModule = await ModuleModel.destroy({
        where: { id }
      })
  
      if(!removeModule) return { error: { message: errorMapTypes.ERROR_IN_DELETE_MODULE }, message: null };
  
      return { error: null, message: 'Módulo deletado com sucesso!' };
    } catch(e) {
      return { error: { message: errorMapTypes.ERROR_IN_DELETE_MODULE }, message: e };
    }
  }

  public async findFreeClassroom(): Promise<{ error: {mesage: string} | null, message: ClassroomDataInterface[] | null }> {
    try {
      const freeClassRooms: ClassroomDataInterface[] = await ClassRoomDataModel
      .findAll({ where: { isPremium: false } });

    if(!freeClassRooms) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    return { error: null, message: freeClassRooms }
    } catch(e) {
      return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    }
  };

  public async findAllClassroom(): Promise<{ error: {message: string} | null, message: ClassroomDataInterface[] | null | any }> {
    try {
      const allClassrooms: ClassroomDataInterface[] = await ClassRoomDataModel.findAll();

      if(!allClassrooms) return { error: { message: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
      return { error: null, message: allClassrooms }
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e }
    }
  };

  public async findClassrooms(premium: boolean): Promise<{ error: {mesage: string} | any, message: ClassroomDataInterface[] | null | any }> {
    if(premium) {
      const allClassrooms = await this.findAllClassroom();
      return allClassrooms;
    }
      const freeClassrooms = await this.findFreeClassroom();
      return freeClassrooms;
  };
}

export default ModuleService;
