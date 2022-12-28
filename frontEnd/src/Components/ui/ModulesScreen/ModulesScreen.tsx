import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import ModuleCard from './ModuleCard';
import styles from './styles.module.scss';

export default function ModulesScreen() {
  const { modules } = useSelector((state: globalState) => state);
  console.log(modules);
  return (
    <section className={styles.module_container}>
      <section>
        { modules.modules.map((currModule: ModulesInterface) => (
          <ModuleCard moduleCard={currModule} key={currModule.id}/>
        )) }
      </section>
      <section>
        { modules.modules.map((currModule: ModulesInterface) => (
          <ModuleCard moduleCard={currModule} key={currModule.id}/>
        )) }
      </section>
    </section>
  );
}
