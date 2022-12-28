import { Dispatch } from 'react';
import { IClassController } from '../../../interfaces/modules/classroomControllerInterfaces';
import { ClassroomDataInterface, ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { localStorageKeys } from '../../Types/localStorageTypes';
import { buyPremium, incompleteASubModule, setCurrClass, setCurrModule, setCurrSubmodule } from '../genericActions';
import { selectCurrSubModule } from './genericActions';

export const selectClassroomAction = (currClassroom: ClassroomInterface): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { name, conclude, image, premium, id } = currClassroom;
    const classData = state().classroomsData.classroomsData;
    const userData = state().user.userData;

    if(!userData.premium && premium) {
      dispatch(buyPremium({name, image}));
    } else {
      const findClassData = classData.find((currClass: ClassroomDataInterface) =>
        currClass.classroomId === id) as ClassroomDataInterface;
      const { video, colors, description, multiExemple } = findClassData;
      const mountClassData: IClassController  = { video, colors, description, id, image, name,premium, conclude, multiExemple };

      dispatch(setCurrClass(mountClassData));
    }
  };
};

const getCurrSubModule = (subModules: SubModuleInterface[], id: number) => subModules
  .find((currSModule: SubModuleInterface) =>
    currSModule.id === id) as SubModuleInterface;

export const nextClassoomAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { classroom, currSubModule, subModules } = state().classroomController;
    const currSubModuleData = getCurrSubModule(subModules, currSubModule.id);
    const nextClassroomId = currSubModuleData.classrooms.findIndex((currClassroom: ClassroomInterface) =>
      currClassroom.id === classroom.id) + 1;
    const nextClassroom = currSubModuleData.classrooms[nextClassroomId];
    console.log(nextClassroom);
    if(nextClassroomId === currSubModuleData.classrooms.length) {
      let nextSubModuleId = subModules
        .findIndex((currSubMod: SubModuleInterface) => currSubMod.id === currSubModule.id) + 1;
      if(!subModules[nextSubModuleId].classrooms.length) {
        nextSubModuleId += 1;
      }
      const nextSubModuleData = subModules[nextSubModuleId];
      dispatch(selectCurrSubModule({ name: nextSubModuleData.name, id: nextSubModuleData.id }));
      dispatch(selectClassroomAction(nextSubModuleData.classrooms[0]));
      return;
    }
    dispatch(selectClassroomAction(nextClassroom));
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
    dispatch(selectClassroomAction(firstClassroom));
  };
};

export const selectSubModuleAction = (module: ModulesInterface): any => {
  const { name, id } = module;
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state().subModules;
    const currSubModules = subModules.filter((currSubModule: SubModuleInterface) =>
      currSubModule.moduleId === id);
    if(!currSubModules.length) {
      localStorage.setItem(localStorageKeys.lastModule, JSON.stringify({id, name}));
      dispatch(incompleteASubModule());
      return;
    }
    localStorage.setItem(localStorageKeys.lastModule, JSON.stringify({id, name}));
    dispatch(selectFirstClassroom(currSubModules[0]));
    dispatch(setCurrModule({module: {name, id}, subModules: currSubModules}));
  };
};
