import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';
import { } from 'react-icons';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { nextClassoomAction, prevClassoomAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';

export default function PlayerHeader() {

  const dispatch = useDispatch();

  const nextClassroom = () => {
    dispatch(nextClassoomAction());
  };

  const prevClassroom = () => {
    dispatch(prevClassoomAction());
  };

  const { classroom, currSubModule, module } = useSelector(({classroomController}: globalState) => classroomController);
  return (
    <header className={styles.header_container}>
      <section>
        <article>
          <h1>{classroom.name}</h1>
          <span>
            { `${module.name} > ${currSubModule.name} > ${classroom.name}` }
          </span>
        </article>
        <aside>
          <button onClick={prevClassroom}>
            <FaArrowLeft />
          </button>
          <button onClick={nextClassroom}>
            <FaArrowRight />
          </button>
        </aside>
      </section>
    </header>
  );
}
