/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect } from 'react';
import { ModulesInterface, SubModuleInterface } from '../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';

interface ModuleCardProps {
  subModule: SubModuleInterface;
  handleModal: () => void;
  handleModule: (module: SubModuleInterface) => void
}

function SubModuleCard({ subModule, handleModal, handleModule }: ModuleCardProps) {

  const { modules: referenceModule } = useSelector((state: globalState) => state.modules);

  const selectModule = () => {
    handleModule(subModule);
    handleModal();
  };

  const referenceModuleName = () => referenceModule
    .find((currModule: ModulesInterface) => currModule.id === subModule.moduleId);

  return (
    <button onClick={selectModule} className={styles.card_container}>
      <section>
        <Image  
          width={300}
          height={400}
          sizes={'auto'}
          src={`${subModule.image}`}
          alt={`${subModule.name}`}
        />
      </section>
      <section className={styles.inf_area}>
        <article>
          <h1>{subModule.name}</h1>
          <span>
            {subModule.description}
          </span>
          <span>
            Pertence a {referenceModuleName()?.name}
          </span>
        </article>
      </section>
    </button>
  );
}

export default SubModuleCard;
