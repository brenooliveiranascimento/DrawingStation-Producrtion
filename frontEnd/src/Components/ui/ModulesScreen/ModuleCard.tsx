import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { handleScreen, setCurrClass, setCurrModule, setCurrSubmodule } from '../../../redux/actions/genericActions';

import styles from './styles.module.scss';

interface IModuleCard {
  moduleCard: ModulesInterface;
}

export default function ModuleCard({ moduleCard }: IModuleCard) {
  const dispatch = useDispatch();

  const { image, name } = moduleCard;
  return (
    <section className={styles.module_card_container}>
      <Image style={{borderTopLeftRadius: 6, borderTopRightRadius: 6, objectFit: 'cover'}}
        width={250} height={270} src={image} alt={name} />
      <article>
        <h2>{name}</h2>
      </article>
      <button type='button'>
        <span>
          Continuar assistindo
        </span>
      </button>
    </section>
  );
}

