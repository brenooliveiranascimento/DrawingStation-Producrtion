import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import iron from '../../../../public/slides/IMG_20220206_150724_464.jpg';
import terry from '../../../../public/slides/IMG_20220206_140140_972.jpg';
import rose from '../../../../public/slides/IMG_20220206_141936_387.jpg';
import overlord from '../../../../public/slides/20221222_112236.jpg';
import petalas from '../../../../public/slides/185260984_226424965912218_968174185900381219_n.jpg';
import rosVermelha from '../../../../public/slides/182569089_474936037058831_8766570739784457258_n.jpg';
import rosaAzul from '../../../../public/slides/273445598_3179540662264778_8385774169414704929_n.jpg';
import Logo from '../../../../public/logo1.png';
import guyWithPEncil from '../../../../public/lottie/uoSNVuwVhC.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import Lottie from 'react-lottie';
import styles from './styles.module.scss';

export default function LoginCarrousel() {

  const items = [
    { photo: rosaAzul },
    { photo: iron },
    { photo: terry },
    { photo: overlord },
    { photo: petalas },
    { photo: rosVermelha },
    { photo: rose }
  ];
  const defaultOptionsLoading: any = {
    loop: false,
    autoplay: true,
    animationData: guyWithPEncil,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      speed: 2
    },
  };

  return (
    <aside>
      <Image
        width={350}
        alt='logo'
        className={styles.logo_position}
        src={Logo}
      />
      <article
        style={{
          position: 'absolute',
          zIndex:10,
          width: 500,
          height: 600,
        }}
      >
        <Swiper
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {items.map((currItem: any, index: number) => (
            <SwiperSlide
              key={index}>
              <Image
                style={{
                  objectFit: 'cover',
                  filter: 'brightness(70%)',
                  borderTopLeftRadius: '1rem',
                  borderBottomLeftRadius: '1rem',
                }}
                width={500} height={550} src={currItem.photo} alt='slide' />
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
      <nav className={styles.lottie} >
        <Lottie
          style={{ width: 260, height: 280, }}
          options={defaultOptionsLoading}></Lottie>
      </nav>
      <Image
        src={terry}
        style={{objectFit: 'cover',
          filter: 'brightness(30%)',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
        }}
        width={500}
        height={550}
        alt='Terry crews'
      />
      <article className={styles.message}>
        <h1>Te levando ao próximo nível</h1>
        <span>Desenhos realistas com lápis de cor</span>
      </article>
    </aside>
  );
}
