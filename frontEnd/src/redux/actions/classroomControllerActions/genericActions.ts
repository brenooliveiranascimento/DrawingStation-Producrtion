import { ClassroomControllerTypes } from '../../Types/AuthTypes';

export const selectCurrSubModule = (currSubModule: {name: string, id: number}) => ({
  type: ClassroomControllerTypes.SELECT_SUBMODULE,
  payload: currSubModule
});