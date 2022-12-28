import Vimeo from '@u-wave/react-vimeo';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { nextClassoomAction, prevClassoomAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import PlayerInf from './PlayerInf/PlayerInf';
import styles from './styles.module.scss';

interface playerProps {
  showSidebar: () => void;
  width: number
}

export default function Player({ showSidebar, width }: playerProps) {
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
      { width <= 1590 && <button style={{
        justifySelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.0)', border: 'none'
      }} onClick={showSidebar}>
        <FiMenu size={20} color='white'/>
      </button> }
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
