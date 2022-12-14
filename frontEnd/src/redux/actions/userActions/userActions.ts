import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { AuthTypes } from '../../Types/AuthTypes';
import { genericSuccesRequest } from '../genericActions';

export const getAllUsersAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState ) => {
    const { user } = state();
    if(user.usersControllData?.length) return;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/users/getAll',
        { admEmail: user.userData.email },
        { headers: { 'Authorization': token } });
      if(data.message) return dispatch(genericSuccesRequest(AuthTypes.REQUEST_USERS,
        data.message));
    } catch(e: any) {
      if(e) {
        toast.error(`${e.response.data.message}`);
        console.log(e);
      } else {
        console.log('Server Connectionn error');
        toast.error('Server Connectionn error');
      }
    }
  };
};