import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import NewCommentForm from '../../Comments/NewCommentForm/NewCommentForm';
import Colors from './Colors';
import styles from './styles.module.scss';

export default function PlayerInf() {
  const {
    classroomController: { classroom },
    classroomsData: { classroomsData }
  } = useSelector((state: globalState) => state);

  const { name, multiExemple, colors, description } = classroom;

  return (
    <section className={styles.player_inf_container}>
      <section  className={styles.name_Comment_input}>
        <article>
          <h1>
            {classroom.name}
          </h1>
          <p>
            {description}
          </p>
        </article>
        <NewCommentForm/>

      </section>
      <Colors/>
    </section>
  );
}
