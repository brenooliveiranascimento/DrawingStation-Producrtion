import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { selectClassroomAction, selectSubModuleAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { selectCurrSubModule } from '../../../../redux/actions/classroomControllerActions/genericActions';
import { localStorageKeys } from '../../../../redux/Types/localStorageTypes';
import styles from './styles.module.scss';

export default function PlayerSideBar() {
  const { subModules, currSubModule, incomplete, loading, classroom, module } = useSelector(({ classroomController }: globalState) => classroomController);
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

  const selectSubModule = (currSubModuleData: {name: string, id: number}) => {
    dispatch(selectCurrSubModule(currSubModuleData));
  };

  const selectClass = (classInfos: ClassroomInterface) => {
    dispatch(selectClassroomAction(classInfos));
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
      <header>
        <span>{module.name} {'>'} {currSubModule.name} {'>'} {classroom.name}</span>
      </header>
      {
        subModules.map((currModule: SubModuleInterface) => {
          return (
            <section key={currModule.id}>
              <button 
                className={styles.submodule_btn}
                onClick={() => selectSubModule({name: currModule.name, id: currModule.id})}
              >
                {currModule.name}
              </button>
              {currSubModule.id === currModule.id && <section>
                {
                  currModule.classrooms.map((currClassroom: ClassroomInterface) => {
                    return <button
                      style={{
                        backgroundColor: classroom.id === currClassroom.id ? '#382d4a' : '#262737',
                      }}
                      className={styles.classroom_btn}
                      onClick={() => selectClass(currClassroom)} key={currClassroom.id}>
                      <Image
                        alt={currClassroom.name}
                        height={100}
                        width={100}
                        src={currClassroom.image}
                      />
                      {currClassroom.name}
                    </button>;
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
