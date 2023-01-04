import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

export default function NotificationContainer() {
  const {
    user: { userData: { name, premium, profilePhoto, stripeClientId, id } },
    notificationsModule: { data, error, errorMessage }
  } = useSelector((state: globalState) => state);

  return (
    <section className={styles.notification_container}>
      <h1>dawdwadasdw</h1>
    </section>
  );
}
