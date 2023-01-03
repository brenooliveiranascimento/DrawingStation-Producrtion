import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { IEditComment } from '../../../interfaces/modules/commentsModuleInterfaces';
import { apiConnection } from '../../../services/api.connection';
import { requestComments } from './genericAtions';

export const editCommentAction = (commentData: IEditComment): any => {
  return async (dispatch: Dispatch<any>) => {
    const { id, content, userId } = commentData;
    const cookies = parseCookies();

    const token = cookies['DRAWING_USER_DATA'];

    try {
      const { data } = await apiConnection.put(`/comments/update/${id}`,
        { content, userId, },
        { headers: { 'Authorization': token } });
      toast.success(data);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const editSubCommentAction = (commentData: IEditComment): any => {
  return async (dispatch: Dispatch<any>) => {
    const { id, content, userId } = commentData;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post(`/subComments/update/${id}`,
        { content, userId, },
        { headers: { 'Authorization': token } });
      toast.success('Editado com sucesso!');
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
};