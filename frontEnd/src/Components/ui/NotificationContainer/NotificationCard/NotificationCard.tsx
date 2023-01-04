import React from 'react';
import { INotification } from '../../../../interfaces/modules/notificationInterfaces';

interface INotificationCardProps {
  notification: INotification
}

export default function NotificationCard({ notification }: INotificationCardProps) {
  const { active, classData, content, senderData, type } = notification;
  return (
    <article>
      {senderData.name}
    </article>
  );
}
