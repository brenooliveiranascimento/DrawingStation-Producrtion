import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { requestModulesAction } from '../../../redux/actions/moduleActions/moduleActions';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import Modal from 'react-modal';
import EditModuleModal from './EditModuleModal/EditModuleModal';
import AddNewModule from './AddNewModule/AddNewModule';
import ModuleCard from './ModuleCard/ModuleCard';

function ModulesController() {
  const { modules } = useSelector((state: globalState) => state.modules);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(false);
  const [moduleEditing, setModuleEditing] = useState<ModulesInterface>({
    name: '',
    description: '',
    image: '',
    premium: true
  });
  const [firstLoad, setFirstLoad] = useState(true);

  const setModules = () => {
    dispatch(requestModulesAction());
  };

  const handleModule = (module: ModulesInterface) => {
    setModuleEditing(module);
  };

  const handleModal = () => setEditing(!editing);
  const handleAddModal = () => setAdd(!add);

  useEffect(() => {
    if(firstLoad) {
      setModules();
      setFirstLoad(false);
    }
  }, []);
  return (
    <section className={styles.modules_controller_container}>
      <section>
        <h1>Modulos existentes</h1>
        <button onClick={handleAddModal}>
          Add New Module
        </button>
      </section>
      <section className={styles.Modules_area}>
        {modules.map((currModule: ModulesInterface, index: number) => <ModuleCard
          key={index}
          module={currModule}
          handleModal={handleModal}
          handleModule={(module: ModulesInterface) => handleModule(module)}
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
        <EditModuleModal handleModal={handleModal} moduleEditing={moduleEditing}/>
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
        <AddNewModule handleModal={handleAddModal}/>
      </Modal>
    </section>
  );
}

export default  ModulesController;
