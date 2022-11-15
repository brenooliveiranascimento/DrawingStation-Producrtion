import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { EditModule } from '../../../interfaces/modules/ModulesInterface';
import apiConnection from '../../../services/api.connection';
import { addNewModule, initReques, requestSuccess } from '../moduleActions/moduleGenericActions';

export const addNewClassroom = (addedClassroom: EditModule, handleModal:() => void): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    console.log(addedClassroom);
    const { userData } = state().user;
    const { modules } = state().modules;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    const { admPassword, description, id, image, name, premium } = addedClassroom;
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