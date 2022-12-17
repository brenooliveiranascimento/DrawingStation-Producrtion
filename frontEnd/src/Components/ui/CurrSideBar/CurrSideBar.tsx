import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle} from 'react-icons/fi';
import { IScreenBaseProps } from '../../../interfaces/IScressns';

export default function CurrSideBar({ handleScreen, screen }: IScreenBaseProps) {
  return (
    <aside className={styles.side_bar_container}>
      <button onClick={() => handleScreen('Modules')}>
        <FiHome size={35} color={screen === 'Modules' ? '#5c5c5c' : 'white'}/>
      </button>
      <button onClick={() => handleScreen('Contact')}>
        <FiMessageCircle size={35} color={screen === 'Contact' ? '#5c5c5c' : 'white'}/>
      </button>
    </aside>
  );
}
