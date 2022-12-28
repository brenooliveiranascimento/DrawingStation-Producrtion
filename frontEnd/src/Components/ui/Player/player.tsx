import Vimeo from '@u-wave/react-vimeo';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import PlayerInf from './PlayerInf/PlayerInf';
import styles from './styles.module.scss';

export default function Player() {
  const { buyPremium, classroom } = useSelector(({classroomController}: globalState) => classroomController);
  if(buyPremium) {
    return (
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }} className={styles.player}>
        <Link href={'/Subscription'} style={{fontSize:'1.3rem'}}>Tornar se premium</Link>
        <Image
          style={{objectFit: 'cover'}}
          width={300}
          height={400}
          src={classroom.image}
          alt={classroom.name}
        />
      </section>
    );
  }
  return (
    <section className={styles.player}>
      <Vimeo
        video={classroom.video}
        autoplay
      />
      <PlayerInf/>
    </section>
  );
}
