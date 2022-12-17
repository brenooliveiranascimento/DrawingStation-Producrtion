import Image from 'next/image';
import React from 'react';
import { ModulesInterface } from '../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface IModuleCard {
  moduleCard: ModulesInterface;
}

export default function ModuleCard({ moduleCard }: IModuleCard) {
  const { image, name } = moduleCard;
  return (
    <section className={styles.module_card_container}>
      <Image style={{borderTopLeftRadius: 6, borderTopRightRadius: 6}}
        width={170} height={180} src={image} alt={name} />
      <article>
        <h2>{name}</h2>
      </article>
      <button>
        <span>
          Continuar assistindo
        </span>
      </button>
    </section>
  );
}
