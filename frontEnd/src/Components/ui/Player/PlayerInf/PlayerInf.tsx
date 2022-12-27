import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
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
          <button>
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
