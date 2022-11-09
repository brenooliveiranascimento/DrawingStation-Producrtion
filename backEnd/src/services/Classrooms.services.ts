import ClassroomModel from '../database/models/ClassroomModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface, ClassroomInterface } from '../interfaces/classroomsTypes';
import { errorMapTypes } from '../utils/errorMap';
import ModuleService from './Modules.service';

class ClassroomService extends ModuleService {
  public async addNewClassroomData(classroomData: ClassroomDataInterface) {
    try {
      const add = await ClassRoomDataModel.create({...classroomData});
      if(!add) return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM_DATA }, message: null }
    } catch(e) {
      return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM_DATA }, message: e }
    }
  }

  public async addNewClassroom(newClassroom: ClassroomInterface, classroomData: ClassroomDataInterface) {
    try {
      const add = await ClassroomModel.create({...newClassroom});

      if(!add) return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM }, message: null }
  
      const addClassroomData = await this.addNewClassroomData({
        ...classroomData,
        classroomId: add.id
      })
      return { error: null, message: newClassroom };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async findClassroomById(id: number) {
    try {
      const classroom = await ClassroomModel.findOne({where: { id }});
      return { error: null, message: classroom };
    } catch(e) {
      return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: e };
    }
  };

  public async updateClassroomData(classroomData: ClassroomDataInterface, id: number) {
    try {
      const { description, drawing, isPremium, video, image } = classroomData
      const updatedClassroomData = await ClassRoomDataModel.update(
        { image, description, drawing, isPremium, video },
        { where: { id } },
      )
      return { error: null, message: updatedClassroomData }
    } catch(e) {
      return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: e };
    }
  };

  public async updateClassroom(
    newClassroom: ClassroomInterface, classroomData: ClassroomDataInterface, id: number
    ) {
    try {
      const classroomExist = await this.findClassroomById(id);
      const {image, name, premium} = newClassroom

      if(!classroomExist) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: null }
  
      const { error, message } = await this.updateClassroomData(classroomData, id);

      if(error) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: message }

      const updatedClassroomData = await ClassroomModel.update(
        { image, name, premium },
        { where: { id } },
      )
      return { error: null, message: newClassroom };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async deleteClassroom(id: number) {
    try {
      const { error } = await this.findClassroomById(id);
      if(error) return { error: { message: errorMapTypes.REQUEST_ERROR }, message: errorMapTypes.CLASSROOM_DONT_EXIST };

      const deleteClassroom = await ClassroomModel.destroy({
        where: { id }
      })

      return { error: null, message: deleteClassroom };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }
}

export default ClassroomService
