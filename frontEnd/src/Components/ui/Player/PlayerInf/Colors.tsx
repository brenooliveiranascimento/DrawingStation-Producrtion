import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import PencilTable from './PencilTable';
import styles from './styles.module.scss';

export default function Colors() {

  const [showColors, setShowColors] = useState(true);

  const {
    classroomController: { classroom: { multiExemple, colors } },
  } = useSelector((state: globalState) => state);

  if(!colors) {
    return <h1>Materiais em breve</h1>;
  }

  return (
    <aside>
      {
        multiExemple ?
          (
            <section className={styles.pencil_container}>
              {Object.keys(JSON.parse(colors)).map((currColor: string, index: number) => {
                const allColors: any = JSON.parse(colors);
                const currColorList = allColors[currColor];
                return (
                  <section key={index}>
                    <PencilTable currColorList={currColorList} currColor={currColor} />
                  </section>
                );
              })
              }
            </section>
          )
          : 
          (
            <section className={styles.one_pencil_container}>
              {JSON.parse(colors).map((currColor: { cor: string }, index: number) => (
                <PencilTable key={index} currColor={null} currColorList={[currColor]}/>
              ))}
            </section>
          )
      }
    </aside>
  );
}
