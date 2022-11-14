import { ModuleActionInterface, ModulesInterface, ModuleStateInterface } from '../../../interfaces/modules/ModulesInterface';
import { ModulesTypes } from '../../Types/AuthTypes';

const STATE_INITIAL_STATE: ModuleStateInterface = {
  modules: [],
  currModule: null,
  load: true,
  error: false
};

const ACTION_INITIAL_VALUE: ModuleActionInterface = {
  type: '',
  payload: null
};

function modules(state = STATE_INITIAL_STATE, action = ACTION_INITIAL_VALUE) {
  switch(action.type) {
  case ModulesTypes.SELECT_MODULE:
    return { ...state, currModule: action.payload };
  case ModulesTypes.INIT_REQUEST:
    return { ...state, load: true };
  case ModulesTypes.REQUEST_SUCCESS:
    return { ...state, load: false, modules: action.payload };
  case ModulesTypes.REQUEST_FAIL:
    return { ...state, load: false, error: true };
  case ModulesTypes.EDIT_MODULE_MODULE:
    return { ...state, load: false,
      modules: state.modules?.map((currModule: ModulesInterface) => {
        if(currModule.id === action.payload.id) return action.payload;
        return currModule;})};
  case ModulesTypes.DELETE_MODULE:
    return { ...state, load: false,
      modules: state.modules?.filter((currModule: ModulesInterface) => currModule.id !== action.payload.id )};
  case ModulesTypes.ADD_NEW_MODULE:
    return { ...state, load: false, modules: [ ...state.modules, action.payload ]};
  default :
    return state;
  }
}

export default modules;
