import { IClassroomController } from '../../../interfaces/modules/classroomControllerInterfaces';
import { ClassroomControllerTypes } from '../../Types/AuthTypes';

const CLASSROOM_CONTROLLER_DEFAULT_VALUE:IClassroomController = {
  subModule: {
    id: 0,
    name: '',
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
    image: '',
  },
  loading: true
};

const ACTION_DEFAULT_VALUE = {
  type: '',
  payload: undefined
};

export function classroomController(
  state = CLASSROOM_CONTROLLER_DEFAULT_VALUE, action = ACTION_DEFAULT_VALUE) {
  switch(action.type) {
  case ClassroomControllerTypes.SELECT_CLASSROOMS:
    return { ...state, classroom: action.payload, loading: false };
  case ClassroomControllerTypes.SELECT_MODULE:
    return { ...state, module: action.payload, loading: false };
  case ClassroomControllerTypes.SELECT_SUBMODULE:
    return { ...state, subModule: action.payload, loading: false };
  default:
    return state;
  }
}