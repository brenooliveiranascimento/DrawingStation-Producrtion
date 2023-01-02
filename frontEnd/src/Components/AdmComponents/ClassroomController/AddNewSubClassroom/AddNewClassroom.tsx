import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModulesInterface, SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { Input } from '../../../ui/Inputs/Inputs';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { ClassroomDataInterface, ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { addNewClassroomAction } from '../../../../redux/actions/classroomActions/classroomActions';
import styles from './style.module.scss';

interface EditSubModuleInterface {
  handleModal: () => void;
}

function AddNewClassroom({ handleModal }: EditSubModuleInterface) {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const dispatch = useDispatch();

  const [addNewClassroom, setEditingModule] = useState<any>({
    name: '',
    image: '',
    premium: true,
    subModuleId: subModules[0].id,
    conclude: true
  });

  const [identity, setIdentity] = useState('');

  const [addNewClassroomData, setEditingClassroomData] = useState<any>({
    description: '',
    image: '',
    drawing: '',
    isPremium: true,
    video: '',
    colors: [],
    conclude: true,
    multiExemple: false,
  });

  const [confirm, setConfirm] = useState(false);

  const handleChange = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingModule({...addNewClassroom, [name]: checked});
      return; 
    }
    setEditingModule({...addNewClassroom, [name]: value});
  };

  const handleChangeData = (target: any) => {
    const { name, value, type, checked } = target;
    if(type === 'checkbox') {
      setEditingClassroomData({...addNewClassroomData, [name]: checked});
      return; 
    }
    setEditingClassroomData({...addNewClassroomData, [name]: value});
  };

  const handleAddClassroom = () => {
    dispatch(addNewClassroomAction({classroom: addNewClassroom, classroomData: {...addNewClassroomData, colors: JSON.stringify(addNewClassroomData.colors)}}, identity));
  };

  return (
    <section className={styles.modal_container}>
      <form>
        <Input
          onChange={({target}) => handleChange(target)}
          name='name'
          placeholder='name'
          value={addNewClassroom.name}
        />
        <label htmlFor='premium'>
          <Input
            onChange={({target}) => {
              handleChange(target);
              setEditingClassroomData({ ...addNewClassroomData, isPremium: target.checked});
            }}
            name='premium'
            checked={addNewClassroom.premium}
            type={'checkbox'}
          />
          <span>Premium</span>
        </label>
        <Input
          onChange={({target}) => handleChange(target)}
          name='image'
          placeholder='image'
          value={addNewClassroom.image}
        />
        <Input
          onChange={({target}) => setIdentity(target.value)}
          name='identity'
          placeholder='identity'
          type={'password'}
          value={identity}
        />

        <select
          value={addNewClassroom.subModuleId}
          onChange={({target}: any) => setEditingModule({...addNewClassroom, subModuleId: Number(target.value)})}
        >
          {
            subModules.map((currSubModule: SubModuleInterface, index: number) => (
              <option value={currSubModule.id} key={index}>
                {currSubModule.name}
              </option>
            ))}
        </select>
        <button onClick={handleModal}>
          Cancelar
        </button>
        <Input
          onChange={({target}) => handleChangeData(target)}
          name='description'
          placeholder='description'
          value={addNewClassroomData.description}
        />
        <label htmlFor='conclude'>
          <Input
            onChange={({target}) => {
              handleChangeData(target);
              handleChangeData(target);
            }}
            name='conclude'
            checked={addNewClassroomData.conclude}
            type={'checkbox'}
          />
          <span>conclude</span>
        </label>
        <Input
          onChange={({target}) => handleChangeData(target)}
          name='image'
          placeholder='image'
          value={addNewClassroomData.image}
        />
        <Input
          onChange={({target}) => handleChangeData(target)}
          name='drawing'
          placeholder='drawing'
          value={addNewClassroomData.drawing}
        />
        <Input
          onChange={({target}) => handleChangeData(target)}
          name='video'
          placeholder='video'
          type={'password'}
          value={addNewClassroomData.video}
        />
        <button type='button' onClick={(e: FormEvent) => {
          e.preventDefault();
          handleAddClassroom();
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
        style={{ objectFit: 'cover', justifyItems:'flex-start' }}
        src={`${addNewClassroom.image}`}
        alt={`${addNewClassroom.name}`}
      />
    </section>
  );
}

export default AddNewClassroom;
