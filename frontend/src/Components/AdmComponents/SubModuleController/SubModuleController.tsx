import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import ModuleCard from '../../ModuleCard/ModuleCard';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import Modal from 'react-modal';
import { requestSubModulesAction } from '../../../redux/actions/subModuleActions/subModuleActions';
import SubModuleCard from '../../SubModuleCards/SubModuleCards';
import EditSubModuleModal from './EditSubModuleModal/EditSubModuleModal';
// import EditModuleModal from './EditModuleModal/EditModuleModal';
// import AddNewModule from './AddNewModule/AddNewModule';

function SubModulesController() {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(false);
  const [subModuleEditing, setSubModule] = useState<SubModuleInterface>({
    name: '',
    description: '',
    premium: true,
    moduleId: 0,
    image: '',
  });
  const [firstLoad, setFirstLoad] = useState(true);

  const setModules = () => {
    dispatch(requestSubModulesAction());
  };

  const handleModule = (subModule: SubModuleInterface) => {
    setSubModule(subModule);
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
    <section className={styles.sub_modules_controller_container}>
      <section>
        <h1>Modulos existentes</h1>
        <button onClick={handleAddModal}>
          Add New Module
        </button>
      </section>
      <section className={styles.sub_modules_area}>
        {subModules.map((currModule: SubModuleInterface) => <SubModuleCard
          key={currModule.id}
          subModule={currModule}
          handleModal={handleModal}
          handleModule={(module: SubModuleInterface) => handleModule(module)}
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
        <EditSubModuleModal subModuleEditing={subModuleEditing} handleModal={handleModal}/>
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
      </Modal>
    </section>
  );
}

export default  SubModulesController;
