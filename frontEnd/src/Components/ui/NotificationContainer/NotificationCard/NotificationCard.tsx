import React from 'react';
import { INotification } from '../../../../interfaces/modules/notificationInterfaces';
import styles from './styles.module.scss';

interface INotificationCardProps {
  notification: INotification
}

export default function NotificationCard({ notification }: INotificationCardProps) {
  const { active, classData, content, senderData, type } = notification;

  return (
    <article className={styles.notification_card_container}>
      <h1>{senderData.name}</h1>
      <span>{active && 'novo!!'}</span>
    </article>
  );
}
