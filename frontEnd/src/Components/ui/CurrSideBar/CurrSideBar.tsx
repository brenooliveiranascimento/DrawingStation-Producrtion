import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle} from 'react-icons/fi';
import { IScreenBaseProps } from '../../../interfaces/IScressns';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { handleScreen } from '../../../redux/actions/genericActions';

export default function CurrSideBar() {
  const { currScreen } = useSelector((state: globalState) => state.user);
  const dispatch = useDispatch();
  const changeScreen = (screen: string) => {
    dispatch(handleScreen(screen));
  };

  return (
    <aside className={styles.side_bar_container}>
      <button onClick={() => changeScreen('Modules')}>
        <FiHome size={35} color={currScreen === 'Modules' || !currScreen ? '#5c5c5c' : 'white'}/>
      </button>
      <button onClick={() => changeScreen('Contact')}>
        <FiMessageCircle size={35} color={currScreen === 'Contact' ? '#5c5c5c' : 'white'}/>
      </button>
    </aside>
  );
}
