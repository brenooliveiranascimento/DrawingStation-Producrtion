import { Dispatch } from 'react';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { setCurrClass, setCurrModule, setCurrSubmodule } from '../genericActions';

export const selectFirstClassroom = (firstSubModule: SubModuleInterface): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    dispatch(setCurrClass(firstSubModule.classrooms[0]));
  };
};

export const selectSubModuleAction = (module: ModulesInterface): any => {
  const { name, id } = module;
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state().subModules;
    const currSubModules = subModules.filter((currSubModule: SubModuleInterface) =>
      currSubModule.moduleId === id);
    dispatch(selectFirstClassroom(currSubModules[0]));
    dispatch(setCurrModule({module: {name, id}, subModules: currSubModules}));
  };
};