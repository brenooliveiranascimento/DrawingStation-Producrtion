import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditModule } from '../../../../interfaces/modules/ModulesInterface';
import { addModule } from '../../../../redux/actions/moduleActions/moduleActions';
import { Input } from '../../../ui/Inputs/Inputs';
import styles from './style.module.scss';

interface EditModuleInterface {
  handleModal: () => void;
}

function AddNewModule({ handleModal }: EditModuleInterface) {
  const [editingModule, setEditingModule] = useState<EditModule>({
    name: '',
    description: '',
    image: '',
    premium: true,
    admPassword: '',
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

  const updateModule = () => {
    dispatch(addModule(editingModule, handleModal));
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


        <Input
          onChange={({target}) => handleChange(target)}
          name='image'
          placeholder='image'
          value={editingModule.image}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='admPassword'
          type='password'
          placeholder='password'
          value={editingModule.admPassword}
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

        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          updateModule();
        }}>
          {confirm ? 'Confirmar!' : 'Criar'}
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={200}
        height={300}
        src={`${editingModule.image}`}
        alt={`${editingModule.name}`}
      />
    </section>
  );
}

export default AddNewModule;
