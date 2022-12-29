import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';
import { } from 'react-icons';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function PlayerHeader() {
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
          <button>
            <FaArrowLeft />
          </button>
          <button>
            <FaArrowRight />
          </button>
        </aside>
      </section>
    </header>
  );
}
