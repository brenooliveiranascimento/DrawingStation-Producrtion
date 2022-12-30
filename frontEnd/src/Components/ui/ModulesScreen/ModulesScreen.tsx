import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import ModuleCard from './ModuleCard';
import ClassCard from './classCard';
import styles from './styles.module.scss';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ModulesScreen() {
  const { modules, subModules: { subModules } } = useSelector((state: globalState) => state);
  return (
    
    <section className={styles.module_container}>
      <section className={styles.cards_container}>
        <span className={styles.class_name}>Módulos</span>
        <section className={styles.class_card_area} >
          <ModuleCard/>
        </section>
      </section>

      <section className={styles.cards_container}>
        <span className={styles.class_name}>Aulas</span>
        <section className={styles.class_card_area} >
          { subModules.map((currSubModule: SubModuleInterface) => {
            if(!currSubModule.classrooms.length) return;
            return ( 
              <section className={styles.slider_container} key={currSubModule.id}>
                <span className={styles.sub_module_name}>{currSubModule.name}</span>
                <ClassCard subModule={currSubModule}/>
              </section>);
          }) }
        </section>
      </section>
    </section>
  );
}
