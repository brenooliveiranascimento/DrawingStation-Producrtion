import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { Input } from '../../../ui/Inputs/Inputs';

interface EditClassroomInterface {
  handleModal: () => void;
  classroomEditing: ClassroomInterface
}

function EditClassroom({ handleModal, classroomEditing }: EditClassroomInterface) {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const [editClassroom, setEditClassroom] = useState<ClassroomInterface>({
    name: '',
    image: '',
    premium: true,
    subModuleId: subModules[0].id,
  });
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditClassroom({...editClassroom, [name]: checked});
      return; 
    }
    setEditClassroom({...editClassroom, [name]: value});
  };

  const updateSubModule = () => {
  };

  useEffect(() => {
    setEditClassroom(classroomEditing);
  }, []);

  return (
    <section>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          placeholder='name'
          value={editClassroom.name}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          name='premium'
          checked={editClassroom.premium}
          type={'checkbox'}
        />

        <Input
          onChange={({target}) => handleChange(target)}
          placeholder='image'
          name='image'
          value={editClassroom.image}
        />

        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          updateSubModule();
        }}>
          {confirm ? 'Confirmar!' : 'Atualizar'}
        </button>
        <button
          type='button'
        >
          { confirmDelete ? 'Confirmar Exclusão!' : 'Excluir' }
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={200}
        height={300}
        src={`${editClassroom.image}`}
        alt={`${editClassroom.name}`}
      />
    </section>
  );
}

export default EditClassroom;
