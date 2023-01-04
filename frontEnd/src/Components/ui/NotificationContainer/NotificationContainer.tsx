import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

interface INotificationProps {
  active: boolean
}

export default function NotificationContainer({active}: INotificationProps) {

  const {
    user: { userData: { name, premium, profilePhoto, stripeClientId, id } },
    notificationsModule: { data, error, errorMessage }
  } = useSelector((state: globalState) => state);

  return (
    <section
      style={{ height: active ? '600px' : '0px' }}
      className={styles.notification_container}
    >
    </section>
  );
}
