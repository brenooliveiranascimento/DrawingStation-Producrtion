import Image from 'next/image';
import React from 'react';
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
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';

interface IClassCardProps {
  subModule: SubModuleInterface,
}

export default function ClassCard({ subModule }: IClassCardProps) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
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
      {subModule.classrooms.map((currClassroom: ClassroomInterface, index: number) => (
        <SwiperSlide
          key={index} className="">
          <section className={styles.module_card_container}>
            <section className={styles.player_area}>
              <FaPlayCircle/>
            </section>
            <section className={styles.image_area}>
              <Image
                style={{objectFit: 'cover',  filter: 'brightness(80%)'}}
                width={350} height={200} src={currClassroom.image} alt={currClassroom.name} />
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
