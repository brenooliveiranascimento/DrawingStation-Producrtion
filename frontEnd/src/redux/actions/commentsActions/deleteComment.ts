import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { IDeleteComment, IEditComment } from '../../../interfaces/modules/commentsModuleInterfaces';
import { apiConnection } from '../../../services/api.connection';
import { requestComments } from './genericAtions';

export const deleteCommentAction = (commentData: IDeleteComment): any => {
  return async (dispatch: Dispatch<any>) => {
    const { userId, id } = commentData;
    const cookies = parseCookies();

    const token = cookies['DRAWING_USER_DATA'];

    try {
      const { data } = await apiConnection.put(`/comments/delete/${id}`,
        { userId, },
        { headers: { 'Authorization': token } });
      toast.success(data);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      console.log(newComments);
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};