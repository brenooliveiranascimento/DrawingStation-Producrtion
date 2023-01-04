import Image from 'next/image';
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
      <aside className={styles.user_side}>
        <section>
          <Image
            height={50}
            width={90}
            alt={classData.name}
            src={senderData.profilePhoto}
          />
          <h1>{senderData.name} respondeu seu comenttário</h1>
        </section>
        <p>{content}</p>
        <span>{active && 'novo!!'}</span>
      </aside>
      <aside className={styles.class_side}>
        <h2>{classData.name}</h2>
        <Image
          height={100}
          width={100}
          alt={classData.name}
          src={classData.image}
        />
      </aside>
    </article>
  );
}
