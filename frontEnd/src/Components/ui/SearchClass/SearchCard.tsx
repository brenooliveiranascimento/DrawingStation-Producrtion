import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';

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
      <aside>
        <Image
          src={image}
          width={100}
          height={100}
          alt={name}
        />
        <article>
          <h1>{name}</h1>
          <span>
            {findSubModule().name}
          </span>
        </article>
      </aside>
      <aside>
        { premium && !userData.premium && ( <button> Conteúdo premium! </button> )}        
      </aside>
    </section>
  );
}
