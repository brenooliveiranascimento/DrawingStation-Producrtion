import { SubModuleActionInterface, SubModuleInterface, SubModuleStateInterface } from '../../../interfaces/modules/ModulesInterface';
import { SubModulesTypes } from '../../Types/AuthTypes';

const STATE_INITIAL_STATE: SubModuleStateInterface = {
  subModules: [],
  load: false,
  error: false,
  currSubModule: 1
};

const ACTION_INITIAL_VALUE: SubModuleActionInterface = {
  type: '',
  payload: null
};

function subMdules(state = STATE_INITIAL_STATE, action = ACTION_INITIAL_VALUE) {
  switch(action.type) {
  case SubModulesTypes.SELECT_MODULE:
    return { ...state, currSubModule: action.payload };
  case SubModulesTypes.INIT_REQUEST:
    return { ...state, load: true };
  case SubModulesTypes.REQUEST_SUCCESS:
    return { ...state, load: false, subModules: action.payload };
  case SubModulesTypes.REQUEST_FAIL:
    return { ...state, load: false, error: true };
  case SubModulesTypes.EDIT_SUB_MODULES:
    return { ...state, load: false,
      subModules: state.subModules?.map((currSubModule: SubModuleInterface) => {
        if(currSubModule.id === action.payload.id) return action.payload;
        return currSubModule;})};
  case SubModulesTypes.DELETE_MODULE:
    return { ...state, load: false,
      subModules: state.subModules?.filter((currSubModule: SubModuleInterface) => currSubModule.id !== action.payload.id )};
  case SubModulesTypes.ADD_NEW_MODULE:
    return { ...state, load: false, subModules: [ ...state.subModules, action.payload ]};
  default :
    return state;
  }
}

export default subMdules;
