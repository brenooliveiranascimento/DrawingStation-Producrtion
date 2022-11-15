import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { ReqClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import apiConnection from '../../../services/api.connection';

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
      console.log(data);
      toast.success('Classroom adicionado com sucesso!');
    } catch(e: any) {
      console.log(e);
    }
  };
};