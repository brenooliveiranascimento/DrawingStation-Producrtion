import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface, ICurrClassroomData } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { setCurrClass, setCurrSubmodule, setCurrSubmoduleData } from '../../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule, incomplete } = useSelector(({ classroomController }: globalState) => classroomController);
  const [subModuleData, setSubModuleData] = useState<SubModuleInterface[]>([]);

  if(incomplete) {
    return (<h1>Sub module incompleto</h1>);
  }

  return ( 
    <aside className={styles.side_container}>
      {
        subModules.map((currModule: SubModuleInterface) => {
          return (
            <section key={currModule.id}>
              <button >
                {currModule.name}
              </button>
              {currSubModule.id === currModule.id && <section>
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
