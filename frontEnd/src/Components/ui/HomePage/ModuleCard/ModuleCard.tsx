import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModulesInterface } from '../../../../interfaces/modules/ModulesInterface';
import { setCurrSubmodule } from '../../../../redux/actions/genericActions';
import { serverSideSetupUser } from '../../../../services/setupUser';
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';

interface IModuleCard {
  moduleCard: ModulesInterface;
}

export default function ModuleCard({ moduleCard }: IModuleCard) {
  const dispatch = useDispatch();
  const redirect = () => {
    dispatch(setCurrSubmodule(Number(moduleCard.id)));
    Router.push('/Classrooms');
  };
  const { image, name } = moduleCard;
  return (
    <section className={styles.module_card_container}>
      <Image style={{borderTopLeftRadius: 6, borderTopRightRadius: 6}}
        width={170} height={180} src={image} alt={name} />
      <article>
        <h2>{name}</h2>
      </article>
      <button onClick={redirect}>
        <span>
          Continuar assistindo
        </span>
      </button>
    </section>
  );
}

