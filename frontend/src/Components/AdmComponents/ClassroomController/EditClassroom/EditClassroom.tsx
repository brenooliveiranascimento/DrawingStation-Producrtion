import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { editingClassroomAction } from '../../../../redux/actions/classroomActions/classroomActions';
import { Input } from '../../../ui/Inputs/Inputs';
import styles from './style.module.scss';

interface EditClassroomInterface {
  handleModal: () => void;
  classroomEditing: ClassroomInterface;
  classroomEditingData: ClassroomDataInterface,
}

function EditClassroom({ handleModal, classroomEditing, classroomEditingData }: EditClassroomInterface) {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const [editClassroom, setEditClassroom] = useState<ClassroomInterface>({
    name: '',
    image: '',
    premium: true,
    subModuleId: subModules[0].id,
  });

  const [editClassroomData, setEditClassroomData] = useState<ClassroomDataInterface>({
    image: '',
    description: '',
    drawing: '',
    isPremium: true,
    video: '',
  });

  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [identity, setIdentity] = useState('');

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditClassroom({...editClassroom, [name]: checked});
      return; 
    }
    setEditClassroom({...editClassroom, [name]: value});
  };

  const handleChangeClassData = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditClassroomData({...editClassroomData, [name]: checked});
      return; 
    }
    setEditClassroomData({...editClassroomData, [name]: value});
  };

  const handleUpdate = () => {
    dispatch(editingClassroomAction({ classroom: editClassroom, classroomData: editClassroomData }, identity, handleModal));
  };

  useEffect(() => {
    setEditClassroom(classroomEditing);
    setEditClassroomData(classroomEditingData);
  }, []);

  return (
    <section className={styles.modal_container}>
      <form>
        <h2>Card Inf</h2>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          placeholder='name'
          value={editClassroom.name}
        />
        <label htmlFor='premium'>
          <Input
            onChange={({target}) => handleChange(target)}
            name='premium'
            checked={editClassroom.premium}
            type={'checkbox'}
          />
          <span>Premium</span>
        </label>

        <Input
          onChange={({target}) => handleChange(target)}
          placeholder='image'
          name='image'
          value={editClassroom.image}
        />
      </form>

      <form>
        <h2>Sensive Data</h2>
        <Input
          onChange={({target}) => handleChangeClassData(target)}
          name='image'
          placeholder='image'
          value={editClassroomData.image}
        />


        <label htmlFor='isPremium'>
          <Input
            onChange={({target}) => handleChangeClassData(target)}
            name='isPremium'
            checked={editClassroomData.isPremium}
            type={'checkbox'}
          />
          <span>Premium</span>
        </label>

        <Input
          onChange={({target}) => handleChangeClassData(target)}
          placeholder='drawing'
          name='drawing'
          value={editClassroomData.drawing}
        />

        <Input
          onChange={({target}) => handleChangeClassData(target)}
          placeholder='video'
          name='video'
          type={'password'}
          value={editClassroomData.video}
        />

        <Input
          onChange={({target}) => setIdentity(target.value)}
          placeholder='identity'
          name='identity'
          type={'password'}
          value={identity}
        />

        <Input
          onChange={({target}) => handleChangeClassData(target)}
          placeholder='description'
          name='description'
          value={editClassroomData.description}
        />

        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          if(!confirm) return setConfirm(!confirm);
          handleUpdate();
        }}>
          {confirm ? 'Confirmar!' : 'Atualizar'}
        </button>
        <button type='button' >
          { confirmDelete ? 'Confirmar Exclusão!' : 'Excluir' }
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <Image
        width={200}
        style={{ objectFit: 'cover', justifyItems:'flex-start' }}
        height={300}
        src={`${editClassroom.image}`}
        alt={`${editClassroom.name}`}
      />
    </section>
  );
}

export default EditClassroom;
