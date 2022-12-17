import React from 'react';
import styles from './styles.module.scss';
import { FiHome, FiMessageCircle} from 'react-icons/fi';
export default function CurrSideBar() {
  return (
    <aside className={styles.side_bar_container}>
      <button>
        <FiHome size={25} color='white'/>
      </button>
      <button>
        <FiMessageCircle size={25} color='white'/>
      </button>
    </aside>
  );
}
