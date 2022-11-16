import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditModule } from '../../../../interfaces/modules/ModulesInterface';
import { deleteModule, editModule } from '../../../../redux/actions/moduleActions/moduleActions';
import { Input } from '../../../ui/Inputs/Inputs';
import styles from './style.module.scss';

interface EditModuleInterface {
  handleModal: () => void;
  moduleEditing: EditModule
}

function EditModuleModal({ handleModal, moduleEditing }: EditModuleInterface) {
  const [editingModule, setEditingModule] = useState<EditModule>({
    name: '',
    description: '',
    image: '',
    premium: true,
    admPassword: '',
  });
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setEditingModule(moduleEditing);
  }, []);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingModule({...editingModule, [name]: checked});
      return; 
    }
    setEditingModule({...editingModule, [name]: value});
  };

  const handleDeleteModule = () => {
    if(confirmDelete) {
      dispatch(deleteModule(editingModule, handleModal));
      setConfirmDelete(!confirmDelete);
    }
    setConfirmDelete(!confirmDelete);
  };

  const updateModule = () => {
    dispatch(editModule(editingModule, handleModal));
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
          placeholder='description'
          name='description'
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
          placeholder='image'
          name='image'
          value={editingModule.image}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='admPassword'
          type='password'
          placeholder='password'
          value={editingModule.admPassword}
        />
        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          updateModule();
        }}>
          {confirm ? 'Confirmar!' : 'Atualizar'}
        </button>
        <button
          type='button'
          onClick={handleDeleteModule}
        >
          {confirmDelete ? 'Confirmar Remoção' : 'Deletar'}
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        style={{ objectFit: 'cover', justifyItems:'flex-start' }}
        width={300}
        height={400}
        src={`${editingModule.image}`}
        alt={`${editingModule.name}`}
      />
    </section>
  );
}

export default EditModuleModal;
