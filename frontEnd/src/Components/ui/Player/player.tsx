import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClassroomDataInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

export default function Player() {
  const { classroomsData } = useSelector(({classroomsData}: globalState) => classroomsData);
  const [id, setId] = useState<any>('');
  const Route = useRouter();
  const videoId = () => {
    const getId = classroomsData.find((currClassroom: ClassroomDataInterface) => Number(currClassroom.id) === Number(Router.query.classId));
    setId(getId?.video);
  };
  useEffect(() => {
    videoId();
  }, [Router.query.classId]);

  return (
    <section className={styles.player}>
      <iframe width="560" height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      ></iframe>
    </section>
  );
}
