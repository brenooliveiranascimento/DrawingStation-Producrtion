/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ModulesInterface } from '../../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface ModuleCardProps {
  module: ModulesInterface;
  handleModal: () => void;
  handleModule: (module: ModulesInterface) => void
}

function ClassroomCard({ module, handleModal, handleModule }: ModuleCardProps) {
  const selectModule = () => {
    handleModule(module);
    handleModal();
  };

  return (
    <button onClick={selectModule} className={styles.card_container}>
      <section>
        <Image
          style={{ objectFit: 'cover', justifyItems:'flex-start' }}
          width={275}
          height={300}
          sizes={'auto'}
          src={`${module.image}`}
          alt={`${module.name}`}
        />
      </section>
      <section className={styles.inf_area}>
        <article>
          <h1>{module.name}</h1>
          <span>
            {module.description}
          </span>
        </article>
      </section>
    </button>
  );
}

export default ClassroomCard;
