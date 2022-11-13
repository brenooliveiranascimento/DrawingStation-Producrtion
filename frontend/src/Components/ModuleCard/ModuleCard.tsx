/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ModulesInterface } from '../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface ModuleCardProps {
  module: ModulesInterface
}

function ModuleCard({ module }: ModuleCardProps) {
  return (
    <button className={styles.card_container}>
      <section>
        <Image  
          width={300}
          height={400}
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

export default ModuleCard;
