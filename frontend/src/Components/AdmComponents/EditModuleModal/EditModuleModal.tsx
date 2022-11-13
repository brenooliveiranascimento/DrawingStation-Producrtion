import React, { useEffect, useState } from 'react';
import { OnChangeCallback } from 'react-toastify/dist/core';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import { Input } from '../../ui/Inputs/Inputs';

interface EditModuleInterface {
  handleModal: () => void;
  moduleEditing: ModulesInterface
}

function EditModuleModal({ handleModal, moduleEditing }: EditModuleInterface) {
  const [editingModule, setEditingModule] = useState<ModulesInterface>({
    name: '',
    description: '',
    image: '',
    premium: true
  });

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
      </form>
      {moduleEditing.description}
    </section>
  );
}

export default EditModuleModal;
