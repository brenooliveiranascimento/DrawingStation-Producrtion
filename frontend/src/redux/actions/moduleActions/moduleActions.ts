import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import apiConnection from '../../../services/api.connection';
import { initReques, requestSuccess } from './moduleGenericActions';

export const requestModulesAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { modules } = state();
    if(!modules.modules) return;
    dispatch(initReques());
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get('/modules', {
        headers: { 'Authorization': token }
      });
      if(data.message) return dispatch(requestSuccess(data.message));
    } catch(e) {
      toast.error('Erro no servidor, tente novamente');
    }
  };
};