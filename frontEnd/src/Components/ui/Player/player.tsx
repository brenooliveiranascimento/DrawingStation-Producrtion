import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomDataInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { setCurrClass } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

export default function Player() {
  const { classroomsData, currClassroom: storeCurrClassroom } = useSelector(({classroomsData}: globalState) => classroomsData);
  const { userData } = useSelector(({user}: globalState) => user);
  const { premium } = userData;
  const [video, setVideo] = useState<string | undefined>('');

  const Rotuer = useRouter();
  const dispatch = useDispatch();

  const videoId = async () => {
    const getId = classroomsData.find((currClassroom: ClassroomDataInterface) => Number(currClassroom.id) === Number(storeCurrClassroom));
    setVideo(getId?.video);
  };

  useEffect(() => {
    videoId();
  }, [storeCurrClassroom]);

  return (
    <section className={styles.player}>
      { !video && !premium ? <h1>Assine o plano premium</h1> : (
        <iframe width="560" height="315"
          src={`https://www.youtube.com/embed/${video}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        ></iframe>
      ) }
    </section>
  );
}
