import ClassroomModel from '../database/models/ClassroomModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface, ClassroomInterface } from '../interfaces/classroomsTypes';
import { errorMapTypes } from '../utils/errorMap';
import ModuleService from './Modules.service';

class ClassroomService extends ModuleService {
  public async addNewClassroomData(classroomData: ClassroomDataInterface) {
    try {
      console.log(classroomData)
      const add = await ClassRoomDataModel.create({...classroomData});
      if(!add) return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM_DATA }, message: add }
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
      if(addClassroomData?.error) {
        return { error: { message: errorMapTypes.REQUEST_ERROR }, message: addClassroomData.message }
      }
      return { error: null, message: addClassroomData };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  }

  public async findClassroomById(id: number) {
    try {
      const classroom = await ClassroomModel.findOne({where: { id }});
      if(!classroom) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: errorMapTypes.CLASSROOM_DONT_EXIST }
      return { error: null, message: classroom };
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: e };
    }
  };

  public async updateClassroomData(classroomData: ClassroomDataInterface, id: number) {
    try {
      const { description, drawing, isPremium, video, image, colors, conclude,  } = classroomData
      const updatedClassroomData = await ClassRoomDataModel.update(
        { image, description, drawing, isPremium, video, colors, conclude },
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
      const { error: checkError, message: checkMessage } = await this.findClassroomById(id);
      const {image, name, premium, conclude} = newClassroom

      if(checkError) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: checkMessage }
  
      const { error, message } = await this.updateClassroomData(classroomData, id);

      if(error) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: message }

      await ClassroomModel.update(
        { image, name, premium, conclude },
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
      if(error) return { error: { message: errorMapTypes.CLASSROOM_DONT_EXIST }, message: errorMapTypes.CLASSROOM_DONT_EXIST };

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