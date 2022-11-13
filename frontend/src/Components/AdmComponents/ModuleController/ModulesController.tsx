import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { requestModulesAction } from '../../../redux/actions/moduleActions/moduleActions';
import ModuleCard from '../../ModuleCard/ModuleCard';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';

function ModulesController() {
  const { modules } = useSelector((state: globalState) => state.modules);
  const dispatch = useDispatch();

  const setModules = () => {
    dispatch(requestModulesAction());
  };

  useEffect(() => {
    setModules();
  }, []);

  return (
    <section className={styles.modules_controller_container}>
      <h1>Modulos existentes</h1>
      <section className={styles.Modules_area}>
        {modules.map((currModule: ModulesInterface) => <ModuleCard module={currModule} />)}
      </section>
    </section>
  );
}

export default  ModulesController;
