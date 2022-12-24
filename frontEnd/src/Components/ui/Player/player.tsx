import Image from 'next/image';
import { useSelector } from 'react-redux';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

export default function Player() {
  const { buyPremium, classroom } = useSelector(({classroomController}: globalState) => classroomController);
  if(buyPremium) {
    return (
      <section>
        <h1>Tornar se premium</h1>
        <Image width={300} height={400} src={classroom.image} alt={classroom.name}/>
      </section>
    );
  }
  return (
    <section className={styles.player}>
      <iframe width="560" height="315"
        src={`https://www.youtube.com/embed/${classroom.video}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      ></iframe>
    </section>
  );
}
