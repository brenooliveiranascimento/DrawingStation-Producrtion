import React, { useEffect, useState } from 'react';
import { OnChangeCallback } from 'react-toastify/dist/core';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import { Input } from '../../ui/Inputs/Inputs';

interface EditModuleInterface {
  handleModal: () => void;
  moduleEditing: ModulesInterface | null
}

function EditModuleModal({ handleModal, moduleEditing }: EditModuleInterface) {
  const [editingModule, setEditingModule] = useState<ModulesInterface | null>(null);

  useEffect(() => {
    setEditingModule(moduleEditing);
  }, []);

  const handleChange = (target: any) => {
    const { name, value } = target;
    setEditingModule({...editingModule, [name]: value});
    console.log(editingModule);
  };

  return (
    <section>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          value={editingModule?.name}
        />
      </form>
      {moduleEditing?.description}
    </section>
  );
}

export default EditModuleModal;
