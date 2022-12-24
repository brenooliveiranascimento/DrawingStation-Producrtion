import { Dispatch } from 'react';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { localStorageKeys } from '../../Types/localStorageTypes';
import { incompleteASubModule, setCurrClass, setCurrModule, setCurrSubmodule } from '../genericActions';
// | any = {name: 'Incompleto', id: 1}
export const selectFirstClassroom = (firstSubModule: SubModuleInterface): any => {
  return async (dispatch: Dispatch<any>) => {
    const { name, id } = firstSubModule;
    dispatch(setCurrSubmodule({ name, id }));
    const firstClassroom = firstSubModule.classrooms[0];
    localStorage.setItem(localStorageKeys.lastSubModule, JSON.stringify(id));
    localStorage.setItem(localStorageKeys.lastClassroom, JSON.stringify(firstClassroom.id));
    dispatch(setCurrClass(firstClassroom));
  };
};

export const selectSubModuleAction = (module: ModulesInterface): any => {
  const { name, id } = module;
  localStorage.setItem(localStorageKeys.lastModule, JSON.stringify(id));
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state().subModules;
    const currSubModules = subModules.filter((currSubModule: SubModuleInterface) =>
      currSubModule.moduleId === id);
    if(!currSubModules.length) {
      dispatch(incompleteASubModule());
      return;
    }
    dispatch(selectFirstClassroom(currSubModules[0]));
    dispatch(setCurrModule({module: {name, id}, subModules: currSubModules}));
  };
};