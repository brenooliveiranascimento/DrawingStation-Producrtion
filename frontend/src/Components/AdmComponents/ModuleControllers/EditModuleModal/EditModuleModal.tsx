import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditModule } from '../../../../interfaces/modules/ModulesInterface';
import { editModule } from '../../../../redux/actions/moduleActions/moduleActions';
import { Input } from '../../../ui/Inputs/Inputs';

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

  const updateModule = () => {
    dispatch(editModule(editingModule, handleModal));
  };

  return (
    <section>
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

        <Input
          onChange={({target}) => handleChange(target)}
          name='premium'
          checked={editingModule.premium}
          type={'checkbox'}
        />

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
      {moduleEditing.description}
    </section>
  );
}

export default EditModuleModal;
