import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface, ICurrClassroomData } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { selectSubModuleAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { setCurrClass, setCurrSubmodule } from '../../../../redux/actions/genericActions';
import { localStorageKeys } from '../../../../redux/Types/localStorageTypes';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule, incomplete, loading } = useSelector(({ classroomController }: globalState) => classroomController);
  const { classroomsData } = useSelector(({ classroomsData }: globalState) => classroomsData);
  const [first, setFirst] = useState(true);
  const dispatch = useDispatch();

  const initLastModule = () => {
    if(first) {
      setFirst(false);
      return;
    }
    if(incomplete) return;
    const lastModule = localStorage.getItem(localStorageKeys.lastModule) as string;
    dispatch(selectSubModuleAction(JSON.parse(lastModule)));
  };

  useEffect(() => {
    initLastModule();
  }, [classroomsData]);

  if(incomplete) {
    return (<h1>Sub module incompleto</h1>);
  }

  if(loading) {
    return (<h1>Carregando!!</h1>);
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
