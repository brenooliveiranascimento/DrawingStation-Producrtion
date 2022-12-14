import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { INotification } from '../../../interfaces/modules/notificationInterfaces';
import { updateNotification } from '../../../redux/actions/notificationActions/updateNotificationAction';
import NotificationCard from './NotificationCard/NotificationCard';
import NotificationHeader from './NotificationHeader/NotificationHeader';
import styles from './styles.module.scss';

interface INotificationProps {
  active: boolean,
  close: () => void
}

export default function NotificationContainer({active, close}: INotificationProps) {

  const {
    user: { userData: { name, premium, profilePhoto, stripeClientId, id } },
    notificationsModule: { data, error, errorMessage }
  } = useSelector((state: globalState) => state);

  const dispatch = useDispatch();

  const [newData, setNewData] = useState<any>([]);

  useEffect(() => {
    if(!active) return;
    setNewData(data);
    dispatch(updateNotification());
  }, [active]);

  return (
    <section
      style={{ height: active ? '600px' : '0px' }}
      className={styles.notification_container} >
      <NotificationHeader close={() => close()}/>
      {
        newData.map((currNotification: INotification) =>
          <NotificationCard notification={currNotification} key={currNotification.id}/>)
      }
    </section>
  );
}
