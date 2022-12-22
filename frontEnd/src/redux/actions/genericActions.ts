import { AuthTypes, SubModulesTypes } from '../Types/AuthTypes';

export const genericRequestControl = (actionType: string) => ({
  type: actionType,
});

export const genericSuccesRequest = (actionType: string, payload: any) => ({
  type: actionType,
  payload
});

export const setCurrSubmodule = (subModuleId: number) => ({
  type: SubModulesTypes.SELECT_SUBMODULE,
  payload: subModuleId,
});

export const setCurrModule = (moduleId: number) => ({
  type: SubModulesTypes.SELECT_MODULE,
  payload: moduleId,
});


export const handleScreen = (screen: string) => ({
  type: AuthTypes.HANDLE_SCREEN,
  payload: screen,
});
