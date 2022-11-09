import ClassroomModel from '../database/models/ClassroomModel';
import SubModuleModel from '../database/models/SubModuleModel';
import ModuleModel from '../database/models/ModuleModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface } from '../interfaces/classroomsTypes';
import { ModuleInterface } from '../interfaces/modulesTypes';
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

  public async getAllModules():  Promise<{ error: {message: string} | null, message: ModuleInterface[] | null }> {
    const modules = await ModuleModel.findAll();
    if(!modules) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: null };
    return { error: null, message: modules };
  }

  public async getModuleById(id: number):  Promise<{ error: {message: string} | null, message: ModuleInterface | null }> {
    const modules = await ModuleModel.findOne({ where: { id } });
    if(!modules) return { error: { message: errorMapTypes.MODULE_NOT_FOUD }, message: null };
    return { error: null, message: modules };
  }


  public async addNewModule(module: ModuleInterface):  Promise<{ error: {message: string} | null, message: ModuleInterface | null }> {
    const add = await ModuleModel.create({
      ...module
    })
    if(!add) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: null };
    return { error: null, message: add };
  }

  public async deleteModule(id: number):  Promise<{ error: {message: string} | null, message: string | null }> {
    const {error} = await this.getModuleById(id);
    if(error) return { error: { message: error.message }, message: null };

    const removeModule = await ModuleModel.destroy({
      where: { id }
    })

    if(!removeModule) return { error: { message: errorMapTypes.ERROR_IN_DELETE_MODULE }, message: null };

    return { error: null, message: 'Módulo deletado com sucesso!' };
  }

  public async findFreeClassroom(): Promise<{ error: {mesage: string} | null, message: ClassroomDataInterface[] | null }> {
    const freeClassRooms: ClassroomDataInterface[] = await ClassRoomDataModel
      .findAll({ where: { isPremium: false } });

    if(!freeClassRooms) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    return { error: null, message: freeClassRooms }
  };

  public async findAllClassroom(): Promise<{ error: {mesage: string} | null, message: ClassroomDataInterface[] | null }> {
    const allClassrooms: ClassroomDataInterface[] = await ClassRoomDataModel.findAll()
    if(!allClassrooms) return { error: { mesage: errorMapTypes.CLASSROOM_REQUEST_ERROR }, message: null }
    return { error: null, message: allClassrooms }
  };

  public async findClassrooms(premium: boolean): Promise<{ error: {mesage: string} | null, message: ClassroomDataInterface[] | null }> {
    if(premium) {
      const classrooms = await this.findAllClassroom();
      return classrooms;
    }
    const classrooms = await this.findFreeClassroom();
    return classrooms;
  };
}

export default ModuleService;
