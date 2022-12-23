import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const [currClassroom, setCurrClasstoom] = useState(1);
  const dispatch = useDispatch();  
  const [moduleData, setModuleData] = useState<any>([]);

  const redirect = (className: string): void => {
    Router.push(`/Classroom/${Router.query.moduleId}/${className}`);
  };

  const initData = async () => {
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
        subModules.filter((currSubModuleInt: SubModuleInterface) =>
          currSubModuleInt.moduleId === Number(Router.query.moduleId))
          .map((currModule: SubModuleInterface) => {
            return (
              <section key={currModule.id}>
                <button>
                  {currModule.name}
                </button>
                {currSubModule === currModule.id && <section>
                  {
                    currModule.classrooms.map((currClassroom: ClassroomInterface) => {
                      return <button onClick={() => redirect(currClassroom.name)} key={currClassroom.id}>{currClassroom.id}</button>;
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
