import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { setCurrModule, setCurrSubmodule } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const { currModule, modules } = useSelector(({ modules }: globalState) => modules);
  const [currClassroom, setCurrClasstoom] = useState(1);
  const dispatch = useDispatch();  
  const [moduleData, setModuleData] = useState([]);

  const initData = async () => {
    const lastSubModule = JSON.parse(localStorage.getItem('DRAWINGSTATION_LAST_SUB_MODUlE') as string);
    const { moduleId } = Router.query;

    const currSubModules = subModules.filter((currSubModuleInt: SubModuleInterface) =>
      currSubModuleInt.moduleId === Number(moduleId));
    setModuleData(currSubModules);
  };

  useEffect(() => {
    initData();
  }, [subModules]);
  
  return (
    <aside className={styles.side_container}>
      {
        moduleData && moduleData.map((currModule: SubModuleInterface) => {
          console.log(currModule);
          return (
            <section key={currModule.id}>
              <button>
                {currModule.name}
              </button>
              {currClassroom === currModule.id && <section>
                {
                  currModule.classrooms.map((currClassroom: ClassroomInterface) => {
                    return <h1 key={currClassroom.id}>{currClassroom.name}</h1>;
                  })
                }
              </section>}
            </section>
          );
        })
      }
    </aside>
  );
}
