import Router from 'next/router';
import React, { useEffect, useState } from 'react';
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
import 'swiper/css/navigation';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

import Image from 'next/image';

export default function ModuleCard() {
  const dispatch = useDispatch();
  const { modules: { modules } } = useSelector((state: globalState) => state);

  const { subModules } = useSelector(({ subModules }: globalState) => subModules);
  const selectModule = (moduleInfo: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInfo));
    dispatch(handleScreen('Classroom'));
    Router.push('/Classroom');
  };

  const countSubModules = (moduleInfo: ModulesInterface) => {
    const getAllSubModules = subModules.find((currSubModule: SubModuleInterface) =>
      currSubModule.id === moduleInfo.id);
    if(getAllSubModules) return getAllSubModules.classrooms.length;
    return 0;
  };

  const [width, setWidth] = useState(0);


  useEffect((): any => {
    const verifyWidth = setInterval(() => setWidth(window.innerWidth), 100);
    return () => clearInterval(verifyWidth);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  const viewQuantityController = () => {
    if(width <= 1777 && width >= 1471) return 3;
    if(width <= 1470  && width >= 1281) return 2;
    if(width <= 1280) return 1;
    return 4;
  };

  const spaceController = () => {
    if(width <= 1777 && width >= 1471) return -100;
    if(width <= 1470  && width >= 1281) return -260;
    if(width <= 1280) return 1;
    return -150;
  };

  return (
    <Swiper
      slidesPerView={viewQuantityController()}
      spaceBetween={spaceController()}
      pagination={{
        clickable: true
      }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
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
                width={width <= 415 ? 300 : 350} height={200} src={currModule.image} alt={currModule.name} />
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

