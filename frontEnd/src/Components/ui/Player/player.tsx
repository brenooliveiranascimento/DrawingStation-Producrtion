import Vimeo from '@u-wave/react-vimeo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiHome, FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { nextClassoomAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import PlayerHeader from './PlaherHeader/PlayerHeader';
import styles from './styles.module.scss';

interface playerProps {
  showSidebar: () => void;
  width: number
}

export default function Player({ showSidebar, width }: playerProps) {
  const { buyPremium, classroom, incomplete, loading } = useSelector(({classroomController}: globalState) => classroomController);
  const dispatch = useDispatch();
  const [loadPlayer, setLoadPlayer] = useState(true);

  const nextClassroom = () => {
    dispatch(nextClassoomAction());
  };

  const router = useRouter();

  const toHome = () => {
    router.push('HomePage');
  };

  if(loading) {
    return <section className={styles.player}>
      <h1>Carregando</h1>
    </section>;
  }

  if(incomplete) {
    return (
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 600
      }} className={styles.player}>
        <h1>Sem aulas disponiveis no momento</h1>
      </section>
    );
  }

  if(buyPremium) {
    return (
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        marginBottom: '-4rem',
      }} className={styles.player}>
        <header style={{
          display: 'flex',
          width: '100%',
        }}>
          <PlayerHeader/>
        </header>
        <section
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
          <Link className={styles.premium} href={'/Subscription'} style={{fontSize:'1.3rem'}}>Tornar se premium</Link>
          <Image
            style={{objectFit: 'cover'}}
            width={ width >= 1590 ? 500 : 300}
            height={ width >= 1590 ? 600 : 300 }
            src={classroom.image}
            alt={classroom.name}
          />
        </section>
      </section>
    );
  }

  return (
    <section className={styles.player}>
      {
        classroom.conclude ? (
          <section>
            <PlayerHeader/>
            { width <= 1590 && <section className={styles.menu}>
              <button className={styles.class} onClick={showSidebar}>
                <FiMenu size={25} color='white'/>
              </button> 
              <button className={styles.home} onClick={toHome}>
                <FiHome size={25} color='white'/>
              </button> 
            </section>
            }
            <Vimeo
              onError={() => toast.error('Erro ao carregar o player')}
              video={classroom.video}
              onLoaded={() => setLoadPlayer(!loadPlayer)}
              onEnd={nextClassroom}
              autoplay
            />
          </section>
        ) : (
          <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            height: 600
          }} className={styles.player}>
            <h1>Aula não fonalizada</h1>
          </section>
        )
      }
    </section>
  );
}
