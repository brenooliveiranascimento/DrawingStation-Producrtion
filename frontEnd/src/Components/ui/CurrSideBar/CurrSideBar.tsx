import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { handleScreen } from '../../../redux/actions/genericActions';
import Router from 'next/router';

export default function CurrSideBar() {
  const { currScreen } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();

  const changeScreen = (screen: string) => {
    Router.push(screen);
    dispatch(handleScreen(screen));
  };

  return (
    <aside className={styles.side_bar_container}>
      <button onClick={() => changeScreen('/')}>
        <FiHome size={35} color={currScreen === 'Modules' || !currScreen ? '#5c5c5c' : 'white'}/>
      </button>
      <button onClick={() => changeScreen('Classroom')}>
        <FiMessageCircle size={35} color={currScreen === 'Contact' ? '#5c5c5c' : 'white'}/>
      </button>
    </aside>
  );
}
