import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules } = useSelector(({ subModules }: globalState) => subModules);
  const { currModule } = useSelector(({ modules }: globalState) => modules);
  
  const [moduleData, setModuleData] = useState([]);
  const initData = async () => {
    const currSubModules = subModules.filter((currSubModuleInt: SubModuleInterface) =>
      currSubModuleInt.moduleId === Number(currModule));
    setModuleData(currSubModules);
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <aside className={styles.side_container}>
      {
        moduleData && moduleData.map((currModule: SubModuleInterface) => {
          console.log(currModule);
          return <h1 key={currModule.id}>{currModule.name}</h1>;
        })
      }
    </aside>
  );
}
