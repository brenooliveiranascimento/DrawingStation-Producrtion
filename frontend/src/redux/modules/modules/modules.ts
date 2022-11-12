import { ModulesTypes } from '../../Types/AuthTypes';

const STATE_INITIAL_STATE = {
  modules: {

  },
  load: true,
  error: false
};

const ACTION_INITIAL_VALUE = {
  type: '',
  payload: {}
};

function modules(state = STATE_INITIAL_STATE, action = ACTION_INITIAL_VALUE) {
  switch(action.type) {
  case ModulesTypes.INIT_REQUEST:
    return { ...state, load: true };
  case ModulesTypes.REQUEST_SUCCESS:
    return { ...state, load: false, modules: action.payload };
  case ModulesTypes.REQUEST_FAIL:
    return { ...state, load: false, error: true };
  case ModulesTypes.EDIT_MODULE_MODULE || ModulesTypes.DELETE_MODULE
  ||  ModulesTypes.ADD_NEW_MODULE:
    return { ...state, load: action.payload };
  default :
    return state;
  }
}

export default modules;
