import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { deleteClassroom, editingClassroomAction } from '../../../../redux/actions/classroomActions/classroomActions';
import { Input, TextArea } from '../../../ui/Inputs/Inputs';
import styles from './style.module.scss';

interface EditClassroomInterface {
  handleModal: () => void;
  classroomEditing: ClassroomInterface;
  classroomEditingData: ClassroomDataInterface,
}

function EditClassroom({ handleModal, classroomEditing, classroomEditingData }: EditClassroomInterface) {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const [currColor, setCurrColor] = useState('');
  const [editing, setEditing] = useState({
    currEditing: '',
    execution: false,
    editedValue: '',
  });
  const [currColorCollection, setCurrColorCollection] = useState([
    {color: ''}
  ]);
  const [editClassroom, setEditClassroom] = useState<ClassroomInterface>({
    name: '',
    image: '',
    premium: true,
    conclude: true,
    subModuleId: subModules[0].id,
  });

  const [editClassroomData, setEditClassroomData] = useState<ClassroomDataInterface>({
    description: '',
    drawing: '',
    image: '',
    isPremium: true,
    conclude: true,
    multiExemple: false,
    colors: [],
    video: '',
    id: 0,
    classroomId: 0,
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
    const jsonColors = JSON.stringify(editClassroomData.colors);
    dispatch(editingClassroomAction({
      classroom: editClassroom, classroomData: {...editClassroomData, colors: jsonColors} }, identity, handleModal));
  };

  const handleDeleteClassroom = () => {
    dispatch(deleteClassroom(classroomEditing, handleModal, identity));
  };

  const addCollor = (e: FormEvent) => {
    e.preventDefault();
    setEditClassroomData({ ...editClassroomData, colors: [...editClassroomData.colors, {cor: currColor} ] });
    setCurrColor('');
  };

  const removeColor = (referenceColor: string) => {
    setEditClassroomData({
      ...editClassroomData, colors: editClassroomData.colors.filter((color: {cor: string}) => color.cor !== referenceColor) 
    });
  };

  const saveEditedColor = (editedColor: string) => {
    setEditClassroomData({
      ...editClassroomData, colors: editClassroomData.colors
        .map((color: {cor: string}) => {
          if(color.cor === editedColor) return { cor: editing.editedValue };
          return { cor: color.cor };
        }) 
    });

    setEditing({
      currEditing: '',
      editedValue: '',
      execution: false,
    });
  };

  const convertColor = async () => {
    const convertColors = await JSON.parse(classroomEditingData.colors);
    setEditClassroomData({ ...classroomEditingData, colors: convertColors });
  };

  useEffect(() => {
    setEditClassroom(classroomEditing);
    convertColor();
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
            onChange={({target}) => {
              handleChange(target);
              setEditClassroomData({...editClassroomData, isPremium: target.checked});
            }}
            name='premium'
            checked={editClassroom.premium}
            type={'checkbox'}
          />
          <span>Premium</span>
        </label>

        <label htmlFor='conclude'>
          <Input
            onChange={({target}) => {
              handleChange(target);
              handleChangeClassData(target); 
            }}
            name='conclude'
            checked={editClassroom.conclude}
            type={'checkbox'}
          />
          <span>conclude</span>
        </label>

        <label htmlFor='multiExemple'>
          <Input
            onChange={({target}) => {
              // setEditClassroomData({...editClassroomData, colors: {}});
              handleChangeClassData(target);
            }}
            disabled
            name='multiExemple'
            checked={editClassroomData.multiExemple}
            type={'checkbox'}
          />
          <span>multiExemple</span>
        </label>
        
        <Input
          onChange={({target}) => handleChange(target)}
          placeholder='image'
          name='image'
          value={editClassroom.image}
        />
        <h2>Sensive Data</h2>
        <Input
          onChange={({target}) => handleChangeClassData(target)}
          name='image'
          placeholder='image'
          value={editClassroomData.image}
        />

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

        <TextArea
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
        <button 
          onClick={(e: FormEvent) => {
            e.preventDefault();
            if(confirmDelete) {
              handleDeleteClassroom();
              setConfirmDelete(!confirmDelete);
              return;
            }
            setConfirmDelete(!confirmDelete);
          }}
          type='button'
        >
          { confirmDelete ? 'Confirmar Exclusão!' : 'Excluir' }
        </button>
        <button onClick={handleModal}>
          Cancelar
        </button>
      </form>
      <form>
        {
          !editClassroomData.multiExemple ? (
            <section>
              <h1>Adicionar variação</h1>
              <form>
                <Input
                  onChange={({target}) => setCurrColor(target.value)}
                  value={currColor}
                />
              </form>
              <ul>
                { editClassroomData.colors.length && editClassroomData.colors.map(({cor}: {cor: string}, index: number) => {
                  return <li key={index}>{
                    editing.currEditing === cor ? (<Input
                      name={cor}
                      value={editing.editedValue}
                      onChange={({target}) => setEditing({ ...editing, editedValue: target.value })}
                    />) : <span>{cor}</span>}
                  <button onClick={(e) => {
                    e.preventDefault();
                    removeColor(cor);
                  }}>-</button>
                  <button onClick={(e) => {
                    e.preventDefault();
                    if(!editing.execution) {
                      setEditing({ currEditing: cor, execution: true, editedValue: cor });
                    } else {
                      saveEditedColor(cor);
                    }
                  }}>
                    {editing.currEditing === cor ? 'salvar' : 'Editar'}
                  </button></li>;
                })}
              </ul>
              <button onClick={addCollor}>Add</button>
            </section>
          ) : (
            <section>
              <h1>Adicionar cor</h1>
            </section>
          )
        }
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
