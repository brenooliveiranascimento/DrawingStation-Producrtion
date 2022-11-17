/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface ModuleCardProps {
  classroom: ClassroomInterface;
  handleModal: () => void;
  handleModule: (classroom: ClassroomInterface) => void
}

function ClassroomCard({ classroom, handleModal, handleModule }: ModuleCardProps) {
  const { subModules } = useSelector((state: globalState) => state.subModules);
  const selectModule = () => {
    handleModule(classroom);
    handleModal();
  };

  const subMoculeReference = () => {
    const to = subModules.find((currSubModule: SubModuleInterface) => currSubModule.id === classroom.subModuleId);
    return to;
  };

  return (
    <button onClick={selectModule} className={styles.card_container}>
      <section>
        <Image
          style={{ objectFit: 'cover', justifyItems:'flex-start' }}
          width={245}
          height={300}
          sizes={'auto'}
          src={`${classroom.image}`}
          alt={`${classroom.name}`}
        />
      </section>
      <section className={styles.inf_area}>
        <article>
          <h1>{classroom.name}</h1>
          <span>
            pertence a {subMoculeReference().name}
          </span>
        </article>
      </section>
    </button>
  );
}

export default ClassroomCard;
