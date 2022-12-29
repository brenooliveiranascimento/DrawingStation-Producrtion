import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { selectSubModuleAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { handleScreen, setCurrClass, setCurrModule, setCurrSubmodule } from '../../../redux/actions/genericActions';

import styles from './styles.module.scss';

interface IModuleCard {
  moduleCard: ModulesInterface;
}

export default function ModuleCard({ moduleCard }: IModuleCard) {
  const dispatch = useDispatch();

  const { subModules } = useSelector(({ subModules }: globalState) => subModules);
  console.log(subModules);
  const selectModule = () => {
    dispatch(selectSubModuleAction(moduleCard));
    dispatch(handleScreen('Classroom'));
    Router.push('/Classroom');
  };
  const { image, name, id } = moduleCard;

  console.log();

  return (
    <section className={styles.module_card_container}>
      <section className={styles.image_area}>
        <Image
          style={{objectFit: 'cover'}}
          width={350} height={200} src={image} alt={name} />
      </section>
      <article>
        <h2>Módulo de {name}</h2>
        <p>{subModules.find((currSubModule: SubModuleInterface) =>
          currSubModule.id === id).classrooms.length} aulas</p>
      </article>
      <section>
      </section>
      <button onClick={selectModule} type='button'>
        <span>
          Continuar assistindo
        </span>
      </button>
    </section>
  );
}

