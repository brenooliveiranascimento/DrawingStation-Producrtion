import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { ReqClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import apiConnection from '../../../services/api.connection';
import { ClassroomsTypes } from '../../Types/AuthTypes';
import { genericSuccesRequest } from '../genericActions';

export const addNewClassroomAction = (addedClassroom: ReqClassroomInterface, identity: string): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { userData } = state().user;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    const { classroom, classroomData,  } = addedClassroom;
    console.log(classroom, classroomData);
    try {
      const { data } = await apiConnection.post('/modules/classrooms',
        {
          admEmail: userData.email,
          identity,
          classroomData,
          classroom
        },
        { headers: { 'Authorization': token } });
      toast.success('Classroom adicionado com sucesso!');
    } catch(e: any) {
      console.log(e);
      if(e.message) {
        console.log(e.response.data);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log('Server Connectionn error');
        toast.error('Server Connectionn error');
      }
    }
  };
};


export const requestClassroomAction = (): any => {
  return async (dispatch: Dispatch<any>) => {
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get('/modules/classrooms',
        { headers: { 'Authorization': token } });
      dispatch(genericSuccesRequest(ClassroomsTypes.REQUEST_SUCCESS, data.message));
    } catch(e: any) {
      console.log(e);
      if(e.message) {
        console.log(e.response.data);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log('Server Connectionn error');
        toast.error('Server Connectionn error');
      }
    }
  };
};
