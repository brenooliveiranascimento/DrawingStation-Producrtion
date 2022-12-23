import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { setCurrClass } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules } = useSelector(({ subModules }: globalState) => subModules);

  const dispatch = useDispatch();

  const redirect = (classId: number): void => {
    Router.push(`/Classroom/${Router.query.moduleId}/${Router.query.subModuleId}/${classId}`);
    localStorage.setItem('DRAWINGSTATION_LAST_CLASS', JSON.stringify(classId));
    dispatch(setCurrClass(classId));
  };

  const selectSubModule = (id: number) => {
    localStorage.setItem('DRAWINGSTATION_LAST_SUB_MODUlE', JSON.stringify(id));
    if(Number(Router.query.subModuleId) === id) {
      return Router.push(`/Classroom/${Router.query.moduleId}/close/${Router.query.classId}`);
    }
    Router.push(`/Classroom/${Router.query.moduleId}/${id}/${Router.query.classId}`);
  };

  return ( 
    <aside className={styles.side_container}>
      {
        subModules.filter((currSubModuleInt: SubModuleInterface) =>
          currSubModuleInt.moduleId === Number(Router.query.moduleId))
          .map((currModule: SubModuleInterface) => {
            return (
              <section key={currModule.id}>
                <button onClick={() => selectSubModule(currModule.id)}>
                  {currModule.name}
                </button>
                {Number(Router.query.subModuleId) === currModule.id && <section>
                  {
                    currModule.classrooms.map((currClassroom: ClassroomInterface) => {
                      return <button onClick={() => redirect(currClassroom.id)} key={currClassroom.id}>{currClassroom.id}</button>;
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
