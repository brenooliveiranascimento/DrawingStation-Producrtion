import React from 'react';
import styles from './styles.module.scss';
import { FaHome } from 'react-icons/fa';
export default function CurrSideBar() {
  return (
    <aside className={styles.side_bar_container}>
      <button>
        <FaHome size={25} color='white'/>
      </button>
    </aside>
  );
}
