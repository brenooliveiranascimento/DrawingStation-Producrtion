import React, { FormEvent, useEffect, useState } from 'react';
import { EditModule, ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import { Input } from '../../ui/Inputs/Inputs';

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
    alert('atualizado!!!');
  };

  return (
    <section>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          value={editingModule.name}
        />
        <Input
          onChange={({target}) => handleChange(target)}
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
          name='image'
          value={editingModule.image}
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
      {moduleEditing.description}
    </section>
  );
}

export default EditModuleModal;
