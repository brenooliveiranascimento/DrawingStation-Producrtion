import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

export default function PlayerHeader() {
  const { currClassroom, classroomsData } = useSelector(({classroomsData}: globalState) => classroomsData);
  const { subModules, currSubModule } = useSelector(({subModules}: globalState) => subModules);
  const { currClassroomData } = useSelector(({classroomsData}: globalState) => classroomsData);
  const [classroomData, setClassroomData] = useState<any>({});



 
  return (
    <header className={styles.header_container}>
      <h1>Tatakae</h1>
    </header>
  );
}
