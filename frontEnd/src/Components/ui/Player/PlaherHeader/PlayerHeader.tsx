import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClassroomDataInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

export default function PlayerHeader() {
  const { currClassroom, classroomsData } = useSelector(({classroomsData}: globalState) => classroomsData);
  const [classroomData, setClassroomData] = useState<any>({});

  const iniClassroom = () => {
    const classroom = classroomsData.find((currClassroomData: ClassroomDataInterface) => {
      if(currClassroomData.id === currClassroom) return currClassroom;
    });
    const items = Router.query;
    console.log(items);
    setClassroomData(classroom);
  };

  useEffect(() => {
    iniClassroom();
  }, [classroomsData]);

  return (
    <header className={styles.header_container}>
      {/* <h1>{classroomData.name}</h1> */}
    </header>
  );
}
