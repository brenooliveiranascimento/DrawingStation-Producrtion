import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { deleteSubModuleAction, updateSubModuleAction } from '../../../../redux/actions/subModuleActions/subModuleActions';
import { Input } from '../../../ui/Inputs/Inputs';
import styles from './style.module.scss';

interface EditModuleInterface {
  handleModal: () => void;
  subModuleEditing: any
}

function EditSubModuleModal({ handleModal, subModuleEditing }: EditModuleInterface) {
  const [editingModule, setEditingModule] = useState<SubModuleInterface>({
    name: '',
    description: '',
    image: '',
    premium: true,
    admPassword: '',
    moduleId: 0,
    identity: '',
  });
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingModule({...editingModule, [name]: checked});
      return; 
    }
    setEditingModule({...editingModule, [name]: value});
  };

  const updateSubModule = () => {
    dispatch(updateSubModuleAction(editingModule, handleModal));
  };

  const handleDeleteSubModule = () => {
    if (confirmDelete) {
      dispatch(deleteSubModuleAction(editingModule, handleModal));
      setConfirmDelete(!confirmDelete);
      return;
    } 
    setConfirmDelete(!confirmDelete);
  };

  useEffect(() => {
    setEditingModule(subModuleEditing);
  }, []);

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
          type='password'
          name='identity'
          placeholder='identity'
          value={editingModule.identity}
        />
        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          updateSubModule();
        }}>
          {confirm ? 'Confirmar!' : 'Atualizar'}
        </button>
        <button
          onClick={handleDeleteSubModule}
          type='button'
        >
          { confirmDelete ? 'Confirmar Exclusão!' : 'Excluir' }
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={300}
        height={400}
        style={{ objectFit: 'cover', justifyItems:'flex-start' }}
        src={`${editingModule.image}`}
        alt={`${editingModule.name}`}
      />
      {subModuleEditing.description}
    </section>
  );
}

export default EditSubModuleModal;
