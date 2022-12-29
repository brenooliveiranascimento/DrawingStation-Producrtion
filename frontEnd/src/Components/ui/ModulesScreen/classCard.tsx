import Image from 'next/image';
import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import styles from './styles.module.scss';

interface IClassCardProps {
  classInf: ClassroomInterface,
  subModule: string
}

export default function ClassCard({ classInf, subModule }: IClassCardProps) {
  const { image, name, conclude, premium, id } = classInf;
  return (
    <section className={styles.module_card_container}>
      <section className={styles.player_area}>
        <FaPlayCircle/>
      </section>
      <section className={styles.image_area}>
        <Image
          style={{objectFit: 'cover'}}
          width={350} height={200} src={image} alt={name} />
      </section>
      <article>
        <h2>{name}</h2>
        <p>{subModule}</p>
      </article>
      <section>
      </section>
      <button type='button'>
        <span>
        Continuar assistindo
        </span>
      </button>
    </section>
  );
}
