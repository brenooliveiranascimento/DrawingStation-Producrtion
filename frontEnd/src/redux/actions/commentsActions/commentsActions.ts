import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { requestComments } from './genericAtions';

export const requestSubCommentsAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { classroomController: { classroom } } = state();
    // if(commentsModule.comments?.length) return;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get(`/comments/all/${classroom.id}`, {
        headers: { 'Authorization': token }
      });
      dispatch(requestComments(data.reverse()));
    } catch(e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };
};