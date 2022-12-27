import Image from 'next/image';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import PlayerInf from './PlayerInf/PlayerInf';
import styles from './styles.module.scss';

export default function Player() {
  const { buyPremium, classroom } = useSelector(({classroomController}: globalState) => classroomController);
  if(buyPremium) {
    return (
      <section className={styles.player}>
        <h1>Tornar se premium</h1>
        <Image width={300} height={400} src={classroom.image} alt={classroom.name}/>
      </section>
    );
  }
  return (
    <section className={styles.player}>
      <iframe
        src="https://player.vimeo.com/video/784557311?h=c9581f27cd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        title="speedart bal&amp;atilde;o metalico">
      </iframe>
      <PlayerInf/>
    </section>
  );
}
