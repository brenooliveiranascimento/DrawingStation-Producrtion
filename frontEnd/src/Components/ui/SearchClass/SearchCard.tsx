import Image from 'next/image';
import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface ISearchCard {
  classroom: ClassroomInterface;
}

export default function SearchCard({ classroom }: ISearchCard) {
  const { id, name, premium, image, conclude, subModuleId } = classroom;

  const {
    subModules: { subModules },
    user: { userData }
  } = useSelector((state: globalState) => state);

  const findSubModule = (): SubModuleInterface =>
    subModules.find((currSubModule: SubModuleInterface) => currSubModule.id === subModuleId);

  return (
    <section>
      <aside className={styles.inf_area}>
        <Image
          src={image}
          width={100}
          style={{objectFit: 'cover',  filter: 'brightness(90%)'}}
          height={100}
          alt={name}
        />
        <div
          className={styles.player}
        >
          <FaPlayCircle
            color='color'
            size={30}
          />
        </div>
        <article>

          <h1>{name}</h1>
          <span>
            {findSubModule().name}
          </span>
          { premium && !userData.premium && ( <button> Conteúdo premium! </button> )}        

        </article>
      </aside>
      <aside
      >
      </aside>
    </section>
  );
}
