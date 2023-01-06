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
import HorizontalBanner from '../../Ads/HorizontalBanner/HorizontalBanner';

export default function ModulesScreen() {
  const { 
    modules,
    subModules: { subModules },
    user: { userData }
  } = useSelector((state: globalState) => state);
  return (
    
    <section className={styles.module_container}>
      <section className={styles.cards_container}>
        <span className={styles.moeula_name}>Módulos</span>
        <section className={styles.class_card_area} >
          <section className={styles.slider_container}>
            <ModuleCard/>
          </section>
        </section>
      </section>
      <section
        style={{
          marginTop:'-3rem'
        }}
      >
        { !userData.premium && <HorizontalBanner/> }
      </section>
      <section className={styles.cards_container}>
        <span style={{
          marginTop: '4rem'
        }} className={styles.class_name}>Aulas</span>
        <section className={styles.class_card_area} >
          { subModules.map((currSubModule: SubModuleInterface, index: number) => {
            if(!currSubModule.classrooms.length) return;
            return ( 
              <section className={styles.slider_container} key={index}>
                <span className={styles.sub_module_name}>{currSubModule.name}</span>
                <ClassCard subModule={currSubModule}/>
              </section>);
          }) }
        </section>
      </section>
    </section>
  );
}
