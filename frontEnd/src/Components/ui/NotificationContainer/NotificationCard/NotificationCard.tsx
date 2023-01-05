import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { INotification } from '../../../../interfaces/modules/notificationInterfaces';
import styles from './styles.module.scss';
import {ModulesInterface, SubModuleInterface} from '../../../../interfaces/modules/ModulesInterface';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { selectClassroomAction, selectSubModuleAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { handleScreen } from '../../../../redux/actions/genericActions';
import { Router, useRouter } from 'next/router';
import { selectCurrSubModule } from '../../../../redux/actions/classroomControllerActions/genericActions';
import { ControllInterfaceTyes } from '../../../../redux/Types/AuthTypes';

interface INotificationCardProps {
  notification: INotification
}

export default function NotificationCard({ notification }: INotificationCardProps) {
  const { active, classData, content, senderData, type } = notification;

  const { subModules: {subModules}, modules: { modules } } = useSelector((state:globalState) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const findSubModule = () => {
    return subModules.find((currSubmodule: SubModuleInterface) =>
      currSubmodule.id === classData.subModuleId );
  };

  const findClass = () => {
    const currSub = subModules.find((currSubmodule: SubModuleInterface) =>
      currSubmodule.id === classData.subModuleId );
    const currClassData = currSub.classrooms.find((currClass: ClassroomInterface) => {
      return currClass.id === classData.id;
    });
    console.log(currClassData);
    return currClassData;
  };

  const selectModule = (moduleInfo: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInfo));
    dispatch(handleScreen('Classroom'));
    router.push('/Classroom');
  };


  const selectClass = (classInfos: ClassroomInterface) => {
    dispatch(selectClassroomAction(classInfos));
  };

  const selectSubModule = () => {
    dispatch({type: ControllInterfaceTyes.GO_TO_COMMENTS, payload: notification.subCommentId});
    const findCurrModule = modules.find((currModule: ModulesInterface) => currModule.id === findSubModule().moduleId);
    selectModule(findCurrModule);
    dispatch(selectCurrSubModule({ name: findSubModule().name, id: findSubModule().id }));
    selectClass(findClass());
  };


  return (
    <article onClick={selectSubModule} className={styles.notification_card_container}>
      <aside className={styles.user_side}>
        <section>
          <Image
            height={50}
            width={90}
            alt={classData.name}
            src={senderData.profilePhoto}
          />
          <h1>{senderData.name.split(' ')[0]} respondeu seu comenttário</h1>
        </section>
        <p>{content}</p>
        <span style={{
          color: 'gold',
          fontWeight: 600,
          objectFit: 'cover'
        }}>{active && 'novo!!'}</span>
      </aside>
      <aside className={styles.class_side}>
        <section>
          <h2 className={styles.class_name}>{classData.name}</h2>
          <span>{findSubModule().name}</span>
        </section>
        <Image
          height={100}
          width={100}
          style={{
            objectFit: 'cover'
          }}
          alt={classData.name}
          src={classData.image}
        />
      </aside>
    </article>
  );
}
