import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import apiConnection from '../../../services/api.connection';
import { SubModulesTypes } from '../../Types/AuthTypes';
import { genericRequestControl, genericSuccesRequest } from '../genericActions';

export const requestSubModulesAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { subModules } = state();
    if(subModules.subModules?.length) return;
    dispatch(genericRequestControl(SubModulesTypes.INIT_REQUEST));
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get('/modules/sub', {
        headers: { 'Authorization': token }
      });
      if(data.message) return dispatch(genericSuccesRequest(SubModulesTypes.REQUEST_SUCCESS, data.message));
    } catch(e) {
      toast.error('Erro no servidor, tente novamente');
    }
  };
};

export const addSubModulesAction = (subModule: SubModuleInterface, handleModal: () => void): any => {
  console.log(addSubModulesAction);
  return async (dispatch: Dispatch<any>, state: () => globalState ) => {
    const { user, subModules } = state();
    dispatch(genericRequestControl(SubModulesTypes.INIT_REQUEST));
    const cookies = parseCookies();
    const { description, image, moduleId, name, premium , identity, classrooms} = subModule;
    const insertData = { description, image, moduleId, name, premium, classrooms };
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/modules/sub',
        {
          admEmail: user.userData.email,
          identity,
          description,
          image, 
          moduleId,
          name,
          premium
        },
        {
          headers: { 'Authorization': token }
        });
      handleModal();
      toast.success('SubModule adicionado com sucesso!');
      if(data.message) return dispatch(genericSuccesRequest(SubModulesTypes.ADD_NEW_MODULE,
        {...insertData, id: subModules.subModules[subModules.subModules.length -1].id + 1}));
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


export const updateSubModuleAction = (subModule: SubModuleInterface, handleModal: () => void): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState ) => {
    const { user } = state();
    dispatch(genericRequestControl(SubModulesTypes.INIT_REQUEST));
    const cookies = parseCookies();
    const { description, image, moduleId, name, premium , identity, id, classrooms} = subModule;
    const insertData = { description, image, moduleId, name, premium, classrooms, id };
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.put(`/modules/sub/${id}`,
        {
          admEmail: user.userData.email,
          identity,
          description,
          image, 
          moduleId,
          name,
          premium
        },
        {
          headers: { 'Authorization': token }
        });
      if(data.message) {
        dispatch(genericSuccesRequest(SubModulesTypes.EDIT_SUB_MODULES,
          insertData));
        toast.success('SubModulo atualizado com sucesso!');
        handleModal();
        return;
      } 
    } catch(e:any) {
      if(e) {
        console.log(e);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log('Server Connectionn error');
        toast.error('Server Connectionn error');
      }
    }
  };
};



export const deleteSubModuleAction = (subModule: SubModuleInterface, handleModal: () => void): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState ) => {
    const { user } = state();
    dispatch(genericRequestControl(SubModulesTypes.INIT_REQUEST));
    const cookies = parseCookies();
    const { identity, id } = subModule;
    const insertData = { id };
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post(`/modules/sub/${id}`,
        {
          admEmail: user.userData.email,
          identity,
        },
        {
          headers: { 'Authorization': token }
        });
      if(data.message) {
        dispatch(genericSuccesRequest(SubModulesTypes.DELETE_MODULE,
          insertData));
        toast.success('SubModulo atualizado com sucesso!');
        handleModal();
        return;
      } 
    } catch(e:any) {
      if(e) {
        console.log(e);
        toast.error(`${e.response.data.message}`);
      } else {
        console.log('Server Connectionn error');
        toast.error('Server Connectionn error');
      }
    }
  };
};


// export const addSubModuleAction = (subModule: SubModuleInterface, handleModal: () => void): any => {
//   return async (dispatch: Dispatch<any>, state: () => globalState ) => {
//     const { user, subModules } = state();
//     const cookies = parseCookies();
//     const { description, image, moduleId, name, premium , identity, id, classrooms} = subModule;
//     const insertData = { description, image, moduleId, name, premium, classrooms, id };
//     const token = cookies['DRAWING_USER_DATA'];
//     try {
//       const { data } = await apiConnection.post('/modules/sub',
//         {
//           admEmail: user.userData.email,
//           identity,
//           description,
//           image, 
//           moduleId,
//           name,
//           premium
//         },
//         {
//           headers: { 'Authorization': token }
//         });
//       if(data.message) {
//         dispatch(genericSuccesRequest(SubModulesTypes.ADD_NEW_MODULE,
//           {...insertData, id: subModules.subModules.length +1}));
//         toast.success('SubModulo atualizado com sucesso!');
//         handleModal();
//         return;
//       } 
//     } catch(e:any) {
//       if(e) {
//         console.log(e);
//         toast.error(`${e.response.data.message}`);
//       } else {
//         console.log('Server Connectionn error');
//         toast.error('Server Connectionn error');
//       }
//     }
//   };
// };

