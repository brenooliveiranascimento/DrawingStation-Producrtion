import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { EditModule } from '../../../interfaces/modules/ModulesInterface';
import apiConnection from '../../../services/api.connection';
import { addNewModule, initReques, requestSuccess, updateModule } from './moduleGenericActions';

export const requestModulesAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { modules } = state();
    if(modules.modules.length) return;
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

export const editModule = (editedModule: EditModule, handleModal:() => void): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { userData } = state().user;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    const { admPassword, description, id, image, name, premium } = editedModule;
    const moduleEdited = {description, id, image, premium, name};

    try {
      const { data } = await apiConnection.put(`/modules/${id}`,
        {
          identity: admPassword,
          admEmail: userData.email,
          name,          
          description,
          image,
          premium
        },
        {
          headers: { 'Authorization': token }
        });
      toast.success('Editado com sucesso!');
      handleModal();
      if(!data.error) return dispatch(updateModule(moduleEdited));
    } catch(e: any) {
      toast.error(`${e.response.data.message}`);
    }
  };
};


export const addModule = (editedModule: EditModule, handleModal:() => void): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    console.log(editedModule);
    const { userData } = state().user;
    const { modules } = state().modules;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    const { admPassword, description, id, image, name, premium } = editedModule;
    const moduleEdited = {description, id, image, premium, name};

    try {
      const { data } = await apiConnection.post('/modules',
        {
          identity: admPassword,
          admEmail: userData.email,
          name,          
          description,
          image,
          premium
        },
        {
          headers: { 'Authorization': token }
        });
      toast.success('Adicionado com sucesso!');
      handleModal();
      if(!data.error) return dispatch(addNewModule({...moduleEdited, id: modules.length +1}));
    } catch(e: any) {
      toast.error(`${e.response.data.message}`);
    }
  };
};

