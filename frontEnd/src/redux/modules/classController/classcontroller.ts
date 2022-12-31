import { IClassroomController } from '../../../interfaces/modules/classroomControllerInterfaces';
import { ClassroomControllerTypes } from '../../Types/AuthTypes';

const CLASSROOM_CONTROLLER_DEFAULT_VALUE:IClassroomController = {
  subModules: [
    {
      description: '',
      id: 0,
      image: '',
      name: '',
      premium: true,
      classrooms: [],
      moduleId: 0,
    }
  ],
  currSubModule: {
    name: '',
    id: 0,
  },
  module: {
    id: 0,
    name: '',
  },
  classroom: {
    id: 0,
    name: '',
    premium: true,
    video: '',
    description: '',
    colors: null,
    conclude: false,
    image: '',
    multiExemple: false
  },
  loading: true,
  buyPremium: true,
  incomplete: false
};

const ACTION_DEFAULT_VALUE: any = {
  type: '',
  payload: undefined
};

export function classroomController(
  state = CLASSROOM_CONTROLLER_DEFAULT_VALUE, action = ACTION_DEFAULT_VALUE) {
  switch(action.type) {
  case ClassroomControllerTypes.SELECT_MODULE:
    return {
      ...state,
      subModules: action.payload.subModules,
      module: action.payload.module,
      loading: false,
      incomplete: false,
    };
  case ClassroomControllerTypes.SELECT_SUBMODULE:
    return { ...state, currSubModule: action.payload, loading: false, incomplete: false };
  case ClassroomControllerTypes.SELECT_CLASSROOMS:
    return { ...state, classroom: action.payload, loading: false, incomplete: false, buyPremium: false };
  case ClassroomControllerTypes.INCOMPLETE_SUBMODULE:
    return { ...state, incomplete: true, loading: false, classroom: {}, currSubModule: {}, subModules: []};
  case ClassroomControllerTypes.BUY_PREIUM:
    return { ...state, incomplete: false, loading: false, classroom: action.payload, buyPremium: true };
  default:
    return state;
  }
}
