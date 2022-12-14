import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModulesInterface, SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { addSubModulesAction } from '../../../../redux/actions/subModuleActions/subModuleActions';
import { Input } from '../../../ui/Inputs/Inputs';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './style.module.scss';

interface EditSubModuleInterface {
  handleModal: () => void;
}

function AddNewSubModule({ handleModal }: EditSubModuleInterface) {
  const { modules } = useSelector((state: globalState) => state.modules);

  const [editingModule, setEditingModule] = useState<any>({
    name: '',
    description: '',
    image: '',
    premium: true,
    admPassword: '',
    moduleId: modules[0].id,
    identity: '',
  });
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingModule({...editingModule, [name]: checked});
      return; 
    }
    setEditingModule({...editingModule, [name]: value});
  };

  const addSubModule = () => {
    dispatch(addSubModulesAction(editingModule, handleModal));
  };

  return (
    <section className={styles.modal_container}>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          placeholder='name'
          value={editingModule.name}
        />
        <Input
          onChange={({target}) => handleChange(target)}
          name='description'
          placeholder='Description'
          value={editingModule.description}
        />

        
        <label htmlFor='premium'>
          <Input
            onChange={({target}) => handleChange(target)}
            name='premium'
            checked={editingModule.premium}
            type={'checkbox'}
          />
          <span>Premium</span>
        </label>
        <Input
          onChange={({target}) => handleChange(target)}
          name='image'
          placeholder='image'
          value={editingModule.image}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='identity'
          type='password'
          placeholder='identity'
          value={editingModule.identity}
        />
        <select
          value={editingModule.moduleId}
          onChange={({target}: any) => setEditingModule({...editingModule, moduleId: Number(target.value)})}
        >
          {
            modules.map((currModule: ModulesInterface, index: number) => (
              <option value={currModule.id} key={index}>
                {currModule.name}
              </option>
            ))
          }
        </select>
        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          addSubModule();
        }}>
          {confirm ? 'Confirmar!' : 'Adicionar'}
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={200}
        height={300}
        src={editingModule.image}
        alt={`${editingModule.name}`}
      />
    </section>
  );
}

export default AddNewSubModule;
