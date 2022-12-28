import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { nextClassoomAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import Comments from '../../Comments/Comments';
import Colors from './Colors';
import styles from './styles.module.scss';

export default function PlayerInf() {
  const {
    classroomController: { classroom },
    classroomsData: { classroomsData }
  } = useSelector((state: globalState) => state);
  const [showColors, setShowColors] = useState(true);

  const { description } = classroom;
  const dispatch = useDispatch();
  const nextClassroom = () => {
    dispatch(nextClassoomAction());
  };

  return (
    <section className={styles.player_inf_container}>
      <section  className={styles.name_Comment_input}>
        <article>
          <h1>
            {classroom.name}
            <button>
              <FaCheckCircle style={{marginBottom: -5, marginLeft: '1rem'}} size={25} color='green'/>
            </button>
          </h1>
          <p>
            {description}
          </p>
        </article>
        <aside>
          <button>
            {'<'} Aula anterior 
          </button>
          <button onClick={nextClassroom}>
            Próxima aula {'>'}
          </button>
        </aside>
      </section>
      <section className={styles.one_pencil_container}>
        <button onClick={() => setShowColors(!showColors)} className={styles.show_materials}>
          { showColors ? 'Esconder Materiais' : 'Materiais necessarios' }
        </button>
        {showColors && <Colors/>}
      </section>

      <Comments/>
    </section>
  );
}
