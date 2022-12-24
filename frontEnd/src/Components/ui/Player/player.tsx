import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { setCurrClass } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function Player() {
  const { userData } = useSelector(({user}: globalState) => user);

  return (
    <section className={styles.player}>
      <iframe width="560" height="315"
        src={'https://www.youtube.com/embed/'}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      ></iframe>
    </section>
  );
}
