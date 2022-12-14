import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import Modal from 'react-modal';
import ClassroomCard from './ClassroomCard/ClassroomCard';
import AddNewClassroom from './AddNewSubClassroom/AddNewClassroom';
import EditClassroom from './EditClassroom/EditClassroom';
import { requestSubModulesAction } from '../../../redux/actions/subModuleActions/subModuleActions';
import { ClassroomDataInterface, ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { requestClassroomAction } from '../../../redux/actions/classroomActions/classroomActions';

function ClassroomController() {
  const { classroomsData } = useSelector((state: globalState) => state.classroomsData);
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(false);
  const [classroomEditing, setClassroomEditing] = useState<any>({
    name: '',
    image: '',
    premium: true,
    conclude: true,
    subModuleId: 0,
  });
  const [classroomEditingData, setClassroomDataEditingData] = useState<ClassroomDataInterface>({
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

  const [firstLoad, setFirstLoad] = useState(true);

  const setClassroom = () => {
    dispatch(requestSubModulesAction());
    dispatch(requestClassroomAction());
  };

  const currClassromEditingData = (classroomId: number): ClassroomDataInterface => {
    const classroom = classroomsData
      .find((currClassroomData: ClassroomDataInterface) => currClassroomData
        .classroomId === classroomId) as ClassroomDataInterface;
    return classroom;
  };

  const handleModule = (classroom: ClassroomInterface) => {
    setClassroomEditing(classroom);
    setClassroomDataEditingData(currClassromEditingData(Number(classroom.id)));
  };

  const handleModal = () => setEditing(!editing);
  const handleAddModal = () => setAdd(!add);

  const allClassrooms = () => {
    const classrooms = subModules?.reduce((acc: any, currSubModule: SubModuleInterface) => {
      return [...acc, ...currSubModule.classrooms];
    }, []);
    return classrooms;
  };

  useEffect(() => {
    if(firstLoad) {
      setClassroom();
      setFirstLoad(false);
    }
  }, []);

  return (
    <section className={styles.Classroom_controller_container}>
      <section>
        <h1>Aulas Existentes existentes</h1>
        <button type='button' onClick={handleAddModal}>
          Adicionar nova aula
        </button>
      </section>
      <section className={styles.Modules_area}>
        {allClassrooms().reverse().map((currModule: ClassroomInterface) => <ClassroomCard
          key={currModule.id}
          classroom={currModule}
          handleModal={handleModal}
          handleModule={(classroom: ClassroomInterface) => handleModule(classroom)}
        />)}
      </section>
      <Modal
        isOpen={editing}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00000029'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: 'none',
            background: 'rgba(0,0,0)',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Example Modal"
      >
        <EditClassroom handleModal={handleModal} classroomEditing={classroomEditing} classroomEditingData={classroomEditingData}/>
      </Modal>
      <Modal
        isOpen={add}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00000029'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: 'none',
            background: 'rgba(0,0,0)',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Example Modal"
      >
        <AddNewClassroom handleModal={handleAddModal} />
      </Modal>
    </section>
  );
}

export default  ClassroomController;
