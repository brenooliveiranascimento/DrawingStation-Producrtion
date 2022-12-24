import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClassroomDataInterface, ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

export default function PlayerHeader() {
  const { classroom } = useSelector(({classroomController}: globalState) =>
    classroomController);

  return (
    <header className={styles.header_container}>
      <h1>{classroom.name}</h1>
    </header>
  );
}
