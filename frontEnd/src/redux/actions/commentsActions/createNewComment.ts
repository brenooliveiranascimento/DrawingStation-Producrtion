import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { INewComment, INewSubComment } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { requestComments } from './genericAtions';

export const crateCommentAction = (commentData: INewComment): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { classroomId, content, userId } = commentData;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/comments/create',
        { classroomId, content, userId, },
        { headers: { 'Authorization': token } });
      console.log(data);
      toast.success(data);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const crateSubCommentAction = (commentData: INewSubComment): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { commentId, content, userId } = commentData;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/subComments/create',
        { commentData, content, userId, },
        { headers: { 'Authorization': token } });
      console.log(data);
      toast.success(data);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};
