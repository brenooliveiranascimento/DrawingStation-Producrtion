import Vimeo from '@u-wave/react-vimeo';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { nextClassoomAction, prevClassoomAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import PlayerInf from './PlayerInf/PlayerInf';
import styles from './styles.module.scss';

interface playerProps {
  showSidebar: () => void
}

export default function Player({ showSidebar }: playerProps) {
  const { buyPremium, classroom } = useSelector(({classroomController}: globalState) => classroomController);
  const dispatch = useDispatch();

  const nextClassroom = () => {
    dispatch(nextClassoomAction());
  };

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
      <button onClick={showSidebar}>
        Modulos
      </button>
      <Vimeo
        onError={() => toast.error('Erro ao carregar o player')}
        video={classroom.video}
        onEnd={nextClassroom}
        autoplay
      />
      <PlayerInf/>
    </section>
  );
}
