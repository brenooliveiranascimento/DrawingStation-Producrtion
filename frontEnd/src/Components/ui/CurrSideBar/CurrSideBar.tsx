import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle} from 'react-icons/fi';
import { IScreenBaseProps } from '../../../interfaces/IScressns';

export default function CurrSideBar({ handleScreen }: IScreenBaseProps) {
  return (
    <aside className={styles.side_bar_container}>
      <button onClick={() => handleScreen('Modules')}>
        <FiHome size={25} color='white'/>
      </button>
      <button onClick={() => handleScreen('Concact')}>
        <FiMessageCircle size={25} color='white'/>
      </button>
    </aside>
  );
}
