import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle, FiPenTool} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { handleScreen } from '../../../redux/actions/genericActions';
import Router, { useRouter } from 'next/router';
import { FaPencilAlt } from 'react-icons/fa';

export default function CurrSideBar() {
  const { currScreen } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();

  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
  };
  
  const router = useRouter();

  const currPath = router.pathname;
  console.log(currPath);

  return (
    <aside className={styles.side_bar_container}>
      <button onClick={() => changeScreen('/')}>
        <FiHome size={28} color={currPath === '/HomePage' || !currScreen ? '#5c5c5c' : 'white'}/>
      </button>
      <button
        onClick={() => changeScreen('Classroom')}>
        <FaPencilAlt size={28} color={currPath === '/Classroom' ? '#5c5c5c' : 'white'}/>
      </button>
    </aside>
  );
}
