import { ActionStateInterface, ClassroomDataInterface, ClassroomStateInterface } from '../../../interfaces/modules/classroomInterface';
import { ClassroomsTypes } from '../../Types/AuthTypes';

const INITIAL_STATE: ClassroomStateInterface = {
  error: false,
  load: false,
  classroomsData: [],
};

const INITIAL_ACITON_VALUE: ActionStateInterface = {
  type: '',
  payload: null,
};

function classroomsData(state = INITIAL_STATE, action = INITIAL_ACITON_VALUE) {
  switch(action.type) {
  case ClassroomsTypes.INIT_REQUEST:
    return { ...state, load: true };
  case ClassroomsTypes.SELECT_CLASSROOMS:
    return { ...state, currClassroom: action.payload };
  case ClassroomsTypes.REQUEST_FAIL:
    return { ...state, load: false, error: true };
  case ClassroomsTypes.REQUEST_SUCCESS:
    return { ...state, load: false, classroomsData: action.payload };
  case ClassroomsTypes.ADD_NEW_CLASSROOMS:
    return { ...state, classroomsData: [...state.classroomsData, action.payload] };
  case ClassroomsTypes.EDIT_SUB_CLASSROOMS:
    return {
      ...state,
      classroomData: state.classroomsData.map((currClassrooms: ClassroomDataInterface) => {
        if(currClassrooms.id === action.payload.id) return action.payload;
        return currClassrooms; })};
  case ClassroomsTypes.DELETE_CLASSROOMS:
    return {
      ...state,
      classroomsData: state.classroomsData
        .filter((currClassroom: ClassroomDataInterface) => currClassroom.id !== action.payload.id)};
  default:
    return state;
  }
}

export default classroomsData;
