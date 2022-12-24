import { Dispatch } from 'react';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { setCurrSubmodule } from '../genericActions';

export const selectSubModuleAction = (moduleId: number): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state().subModules;
    const currSubModules = subModules.filter((currSubModule: SubModuleInterface) =>
      currSubModule.moduleId === moduleId);
    dispatch(setCurrSubmodule(currSubModules));
  };
};