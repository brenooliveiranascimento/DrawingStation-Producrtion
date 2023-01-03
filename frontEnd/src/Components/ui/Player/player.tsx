import Vimeo from '@u-wave/react-vimeo';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
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
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        marginBottom: '-4rem'
      }} className={styles.player}>
        <Link href={'/Subscription'} style={{fontSize:'1.3rem'}}>Tornar se premium</Link>
        <Image
          style={{objectFit: 'cover'}}
          width={200}
          height={200}
          src={classroom.image}
          alt={classroom.name}
        />
      </section>
    );
  }

  return (
    <section className={styles.player}>
      {
        classroom.conclude ? (
          <section>
            <PlayerHeader/>
            <Vimeo
              onError={() => toast.error('Erro ao carregar o player')}
              video={classroom.video}
              onLoaded={() => setLoadPlayer(!loadPlayer)}
              onEnd={nextClassroom}
              autoplay
            />
            { width <= 1590 && <section
              style={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '1rem'
              }}
            >
              <button style={{
                justifySelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.0)', border: 'none'
              }} onClick={showSidebar}>
                <FiMenu className={styles.menu} size={25} color='white'/>
              </button>
            </section> }
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
