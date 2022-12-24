import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface, ICurrClassroomData } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { setCurrClass, setCurrSubmodule, setCurrSubmoduleData } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const [subModuleData, setSubModuleData] = useState<SubModuleInterface[]>([]);

  const initData = () => {
    const subModule = subModules.filter((currSubModuleInt: SubModuleInterface) =>
      currSubModuleInt.moduleId === Number(Router.query.moduleId));
    setSubModuleData(subModule);
  };

  useEffect(() => {
    initData();
  }, [subModules]);

  return ( 
    <aside className={styles.side_container}>
      {
        subModuleData && subModuleData.map((currModule: SubModuleInterface) => {
          return (
            <section key={currModule.id}>
              <button >
                {currModule.name}
              </button>
              {Number(Router.query.subModuleId) === currModule.id && <section>
                {
                  currModule.classrooms.map((currClassroom: ClassroomInterface) => {
                    return <button key={currClassroom.id}>{currClassroom.id}</button>;
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
