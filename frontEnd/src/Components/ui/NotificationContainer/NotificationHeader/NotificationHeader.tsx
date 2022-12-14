import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteAllNotification } from '../../../../redux/actions/notificationActions/deleteNotificaionAcito';
import styles from './styles.module.scss';

interface INotificationHeader {
  close: () => void
}

export default function NotificationHeader({ close }: INotificationHeader) {
  const dispatch = useDispatch();

  const deleteAll = () => {
    dispatch(deleteAllNotification());
    close();
  };

  return (
    <header className={styles.notification_header_container}>
      <aside>
        <button onClick={deleteAll}>
          <FaTrash color='white'/>
        </button>
      </aside>
    </header>
  );
}
