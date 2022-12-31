import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { useDispatch, useSelector } from 'react-redux';
import { selectClassroomAction, selectSubModuleAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { handleScreen, setModuleGenericAtion } from '../../../redux/actions/genericActions';
import Router from 'next/router';
import { selectCurrSubModule } from '../../../redux/actions/classroomControllerActions/genericActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';

interface IClassCardProps {
  subModule: SubModuleInterface,
}

export default function ClassCard({ subModule }: IClassCardProps) {

  const dispatch = useDispatch();
  const { subModules: { subModules }, modules: { modules } } = useSelector((state: globalState) => state);

  const selectModule = (moduleInfo: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInfo));
    dispatch(handleScreen('Classroom'));
    Router.push('/Classroom');
  };


  const selectClass = (classInfos: ClassroomInterface) => {
    dispatch(selectClassroomAction(classInfos));
  };

  const selectSubModule = (classInfos: ClassroomInterface) => {
    const findCurrModule = modules.find((currModule: ModulesInterface) => currModule.id === subModule.moduleId);
    selectModule(findCurrModule);
    dispatch(selectCurrSubModule({ name: subModule.name, id: subModule.id }));
    selectClass(classInfos);
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
    if(width <= 1470  && width >= 1281) return -160;
    return 50;
  };

  return (
    <Swiper
      slidesPerView={viewQuantityController()}
      spaceBetween={spaceController()}
      pagination={{
        clickable: true
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={styles.mySwiper}
    >
      {subModule.classrooms.map((currClassroom: ClassroomInterface, index: number) => (
        <SwiperSlide
          key={index} className="">
          <section onClick={() => selectSubModule(currClassroom)} className={styles.class_card_container}>
            <section className={styles.player_area}>
              <FaPlayCircle/>
            </section>
            <section className={styles.image_area}>
              <Image
                style={{objectFit: 'cover',  filter: 'brightness(80%)'}}
                width={width <= 415 ? 300 : 400 } height={width <= 415 ? 200 : 250 } src={currClassroom.image} alt={currClassroom.name} />
            </section>
            <article>
              <h2>{currClassroom.name}</h2>
              <p>{subModule.name}</p>
            </article>
            <section>
            </section>
            <button type='button'>
              <span>
                Continuar assistindo
              </span>
            </button>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
