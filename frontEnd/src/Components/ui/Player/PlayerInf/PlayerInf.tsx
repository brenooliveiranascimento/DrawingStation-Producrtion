import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import Comments from '../../Comments/Comments';
import NewCommentForm from '../../Comments/NewCommentForm/NewCommentForm';
import Colors from './Colors';
import styles from './styles.module.scss';

export default function PlayerInf() {
  const {
    classroomController: { classroom },
    classroomsData: { classroomsData }
  } = useSelector((state: globalState) => state);
  const [showColors, setShowColors] = useState(true);

  const { description } = classroom;

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
      </section>
      <section className={styles.one_pencil_container}>
        <button onClick={() => setShowColors(!showColors)} className={styles.show_materials}>
            Materiais necessarios
        </button>
        {showColors && <Colors/>}
      </section>

      <Comments/>
    </section>
  );
}
