import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { selectSubModuleAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { handleScreen } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

import Image from 'next/image';

export default function ModuleCard() {
  const dispatch = useDispatch();
  const { modules: { modules } } = useSelector((state: globalState) => state);

  const { subModules } = useSelector(({ subModules }: globalState) => subModules);
  console.log(subModules);
  const selectModule = (moduleInfo: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInfo));
    dispatch(handleScreen('Classroom'));
    Router.push('/Classroom');
  };

  const countSubModules = (moduleInfo: ModulesInterface) => {
    const getAllSubModules = subModules.find((currSubModule: SubModuleInterface) =>
      currSubModule.id === moduleInfo.id);
    console.log(getAllSubModules);
    if(getAllSubModules) return getAllSubModules.classrooms.length;
    return 0;
  };

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={-150}
      pagination={{
        clickable: true
      }}
      //   autoplay={{
      //     delay: 6000,
      //     disableOnInteraction: false
      // }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={styles.mySwiper}
    >
      {modules.map((currModule: ModulesInterface, index: number) => (
        <SwiperSlide
          key={index}>
          <section onClick={() => selectModule(currModule)} className={styles.module_card_container}>
            <section className={styles.image_area}>
              <Image
                style={{objectFit: 'cover'}}
                width={350} height={200} src={currModule.image} alt={currModule.name} />
            </section>
            <article>
              <h2>Módulo de {currModule.name}</h2>
              <p>{countSubModules(currModule)} aulas</p>
            </article>
            <section>
            </section>
            <button type='button'>
              <span>
                Acessar módulo
              </span>
            </button>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  
  );
}

