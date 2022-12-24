import { Dispatch } from 'react';
import { IClassController } from '../../../interfaces/modules/classroomControllerInterfaces';
import { ClassroomDataInterface, ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { localStorageKeys } from '../../Types/localStorageTypes';
import { incompleteASubModule, setCurrClass, setCurrModule, setCurrSubmodule } from '../genericActions';

export const selectClassroom = (currClassroom: ClassroomInterface): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { name, conclude, image, premium, subModuleId, id } = currClassroom;
    const classData = state().classroomsData.classroomsData;

    const findClassData = classData.find((currClass: ClassroomDataInterface) =>
      currClass.classroomId === id) as ClassroomDataInterface;
    const { video, colors, description } = findClassData;
    const mountClassData: IClassController  = { video, colors, description, id, image, name,premium };

    dispatch(selectClassroom(mountClassData));
  };
};

export const selectFirstClassroom = (firstSubModule: SubModuleInterface): any => {
  return async (dispatch: Dispatch<any>) => {
    const { name, id } = firstSubModule;
    dispatch(setCurrSubmodule({ name, id }));
    const firstClassroom = firstSubModule.classrooms[0];
    localStorage.setItem(localStorageKeys.lastSubModule, JSON.stringify({id, name}));
    localStorage.setItem(localStorageKeys.lastClassroom, JSON.stringify({id: firstClassroom.id, name: firstClassroom.name}));
    dispatch(setCurrClass(firstClassroom));
    dispatch(selectClassroom(firstClassroom));
  };
};

export const selectSubModuleAction = (module: ModulesInterface): any => {
  const { name, id } = module;
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state().subModules;
    const currSubModules = subModules.filter((currSubModule: SubModuleInterface) =>
      currSubModule.moduleId === id);
    if(!currSubModules.length) {
      dispatch(incompleteASubModule());
      return;
    }
    localStorage.setItem(localStorageKeys.lastModule, JSON.stringify({id, name}));
    dispatch(selectFirstClassroom(currSubModules[0]));
    dispatch(setCurrModule({module: {name, id}, subModules: currSubModules}));
  };
};